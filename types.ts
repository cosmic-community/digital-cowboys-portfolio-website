// Base Cosmic object interface
export interface CosmicObject {
    id: string;
    slug: string;
    title: string;
    content?: string;
    metadata: Record<string, any>;
    type: string;
    created_at: string;
    modified_at: string;
}

// Service interface
export interface Service extends CosmicObject {
    type: 'services';
    metadata: {
      service_name: string;
      short_description: string;
      full_description?: string;
      icon?: string;
      featured_image?: {
        url: string;
        imgix_url: string;
      };
      starting_price?: string;
    };
}

// Team Member interface
export interface TeamMember extends CosmicObject {
    type: 'team-members';
    metadata: {
      full_name: string;
      role: string;
      bio?: string;
      profile_photo?: {
        url: string;
        imgix_url: string;
      };
      email?: string;
      linkedin?: string;
      twitter?: string;
    };
}

// Testimonial interface
export interface Testimonial extends CosmicObject {
    type: 'testimonials';
    metadata: {
      client_name: string;
      client_company?: string;
      client_role?: string;
      quote: string;
      rating?: {
        key: string;
        value: string;
      };
      client_photo?: {
        url: string;
        imgix_url: string;
      };
    };
}

// Case Study interface
export interface CaseStudy extends CosmicObject {
    type: 'case-studies';
    metadata: {
      project_title: string;
      client_name: string;
      project_summary: string;
      challenge?: string;
      solution?: string;
      results?: string;
      featured_image?: {
        url: string;
        imgix_url: string;
      };
      project_gallery?: Array<{
        url: string;
        imgix_url: string;
      }>;
      services_used?: Service[];
      project_url?: string;
      completion_date?: string;
    };
}

// About Page interface
export interface AboutPage extends CosmicObject {
    type: 'about-pages';
    metadata: {
      hero_headline: string;
      hero_subheadline: string;
      hero_image?: {
        url: string;
        imgix_url: string;
      };
      story_title: string;
      story_content: string;
      mission_statement: string;
      values_title: string;
      value_1_title: string;
      value_1_description: string;
      value_2_title: string;
      value_2_description: string;
      value_3_title: string;
      value_3_description: string;
      value_4_title?: string;
      value_4_description?: string;
      stats_title?: string;
      years_in_business?: number;
      projects_completed?: number;
      happy_clients?: number;
      team_members_count?: number;
    };
}

// Category interface
export interface Category extends CosmicObject {
    type: 'categories';
    metadata: {
      category_name: string;
      description?: string;
      image?: {
        url: string;
        imgix_url: string;
      };
    };
}

// Product interface
export interface Product extends CosmicObject {
    type: 'products';
    metadata: {
      product_name: string;
      description: string;
      price: number;
      compare_at_price?: number;
      sku?: string;
      stock_quantity: number;
      category?: Category;
      images?: Array<{
        url: string;
        imgix_url: string;
      }>;
      featured_image?: {
        url: string;
        imgix_url: string;
      };
      featured: boolean;
    };
}

// Order interface
export interface Order extends CosmicObject {
    type: 'orders';
    metadata: {
      order_number: string;
      customer_email: string;
      customer_name: string;
      shipping_address: string;
      shipping_city: string;
      shipping_state: string;
      shipping_zip: string;
      order_items: Array<{
        product_id: string;
        product_name: string;
        quantity: number;
        price: number;
      }>;
      subtotal: number;
      tax: number;
      shipping: number;
      total: number;
      status: string;
      stripe_payment_intent_id?: string;
      order_date: string;
    };
}

// Blog Post interface
export interface BlogPost extends CosmicObject {
    type: 'blog-posts';
    status: 'draft' | 'published';
    metadata: {
      post_title: string;
      excerpt: string;
      content: string;
      author?: string;
      featured_image?: {
        url: string;
        imgix_url: string;
      };
      category?: string;
      tags?: string[];
      publish_date?: string;
      seo_title?: string;
      seo_description?: string;
      reading_time?: number;
    };
}

// Cart item interface (client-side only)
export interface CartItem {
    product: Product;
    quantity: number;
}

// API response types
export interface CosmicResponse<T> {
    objects: T[];
    total: number;
}

export interface CosmicSingleResponse<T> {
    object: T;
}