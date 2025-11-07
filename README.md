# Digital Cowboys Portfolio Website

A modern, responsive portfolio website for Digital Cowboys web design and development agency, built with Next.js 16 and powered by Cosmic CMS. Showcases services, team members, client testimonials, and case studies with a professional, conversion-focused design.

![Digital Cowboys Preview](https://imgix.cosmicjs.com/adb15590-bb85-11f0-a34a-efbcf979242c-photo-1460925895917-afdab827c52f-1762484326654.jpg?w=1200&h=300&fit=crop&auto=format,compress)

## Features

- 🎨 **Modern Design** - Clean, professional layout with smooth animations
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚡ **Server-Side Rendering** - Fast page loads with Next.js 16 App Router
- 🖼️ **Optimized Images** - Automatic image optimization with imgix
- 🎯 **Services Showcase** - Display all agency services with detailed information
- 👥 **Team Profiles** - Introduce team members with bios and social links
- ⭐ **Client Testimonials** - Feature authentic reviews with ratings
- 💼 **Case Studies** - Detailed project portfolios with results
- 🔍 **SEO Optimized** - Built for search engine visibility
- 🎭 **TypeScript** - Fully typed for reliability and maintainability

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=690d5fc6016a00ed80b5f534&clone_repository=690d62ba016a00ed80b5f565)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for Digital Cowboys a web design and development company with services, team members, testimonials, and case studies"

### Code Generation Prompt

> Based on the content model I created for "Create a content model for Digital Cowboys a web design and development company with services, team members, testimonials, and case studies", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **Bun** - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with your content models set up

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file in the root directory with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Services

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all services
const { objects: services } = await cosmic.objects
  .find({ type: 'services' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get single service by slug
const { object: service } = await cosmic.objects
  .findOne({ type: 'services', slug: 'web-design' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Team Members

```typescript
// Get all team members
const { objects: team } = await cosmic.objects
  .find({ type: 'team-members' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Testimonials

```typescript
// Get all testimonials
const { objects: testimonials } = await cosmic.objects
  .find({ type: 'testimonials' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Case Studies

```typescript
// Get all case studies with related services
const { objects: caseStudies } = await cosmic.objects
  .find({ type: 'case-studies' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Includes related services data
```

## Cosmic CMS Integration

This application uses Cosmic CMS to manage all content:

- **Services** - Web design, development, SEO services with descriptions and pricing
- **Team Members** - Staff profiles with photos, bios, and social links
- **Testimonials** - Client reviews with ratings and company information
- **Case Studies** - Project portfolios with challenges, solutions, and results

All content is fetched server-side for optimal performance and SEO. Images are automatically optimized using imgix parameters for fast loading and responsive display.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Environment Variables

Make sure to add these environment variables in your deployment platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key

## Project Structure

```
digital-cowboys/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── services/
│   │   ├── page.tsx        # Services listing
│   │   └── [slug]/
│   │       └── page.tsx    # Service detail
│   ├── team/
│   │   └── page.tsx        # Team page
│   ├── case-studies/
│   │   ├── page.tsx        # Case studies listing
│   │   └── [slug]/
│   │       └── page.tsx    # Case study detail
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   ├── ServiceCard.tsx     # Service display card
│   ├── TeamMemberCard.tsx  # Team member card
│   ├── TestimonialCard.tsx # Testimonial display
│   ├── CaseStudyCard.tsx   # Case study preview
│   └── CosmicBadge.tsx     # Cosmic branding
├── lib/
│   └── cosmic.ts           # Cosmic SDK client
├── types.ts                # TypeScript definitions
└── tailwind.config.js      # Tailwind configuration
```

<!-- README_END -->