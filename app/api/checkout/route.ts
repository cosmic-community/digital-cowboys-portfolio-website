import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
})

export async function POST(request: NextRequest) {
  try {
    const { cartItems, customerInfo, amounts } = await request.json()

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.metadata.product_name,
            images: item.product.metadata.featured_image 
              ? [`${item.product.metadata.featured_image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`]
              : [],
          },
          unit_amount: Math.round(item.product.metadata.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cart`,
      customer_email: customerInfo.email,
      metadata: {
        customer_name: customerInfo.name,
        shipping_address: customerInfo.address,
        shipping_city: customerInfo.city,
        shipping_state: customerInfo.state,
        shipping_zip: customerInfo.zip,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}