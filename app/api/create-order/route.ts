import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createOrder } from '@/lib/cosmic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-11-20.acacia'
})

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product']
    })

    if (!session.metadata) {
      throw new Error('No metadata found in session')
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}`

    // Prepare order items
    const orderItems = session.line_items?.data.map(item => ({
      product_id: typeof item.price?.product === 'string' ? item.price.product : '',
      product_name: item.description || '',
      quantity: item.quantity || 0,
      price: (item.amount_total || 0) / 100 / (item.quantity || 1)
    })) || []

    // Create order in Cosmic
    const order = await createOrder({
      order_number: orderNumber,
      customer_email: session.customer_email || '',
      customer_name: session.metadata.customer_name,
      shipping_address: session.metadata.shipping_address,
      shipping_city: session.metadata.shipping_city,
      shipping_state: session.metadata.shipping_state,
      shipping_zip: session.metadata.shipping_zip,
      order_items: orderItems,
      subtotal: (session.amount_subtotal || 0) / 100,
      tax: ((session.amount_total || 0) - (session.amount_subtotal || 0)) / 100,
      shipping: 10, // Flat rate
      total: (session.amount_total || 0) / 100,
      status: 'Processing',
      stripe_payment_intent_id: session.payment_intent as string,
      order_date: new Date().toISOString()
    })

    return NextResponse.json({ orderNumber, order })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}