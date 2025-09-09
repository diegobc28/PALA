# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start development server on localhost:3000

# Building & Deployment
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Note: Sitemap is automatically generated after build via next-sitemap
```

## Architecture Overview

This is a **ShipFast Next.js boilerplate** - a SaaS starter kit with authentication, payments, and email functionality.

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Authentication**: NextAuth.js with Google OAuth and magic email links
- **Database**: MongoDB with both Mongoose ODM and native MongoDB adapter
- **Payments**: Stripe with webhook integration for subscription management
- **Styling**: TailwindCSS + DaisyUI component library
- **Email**: Mailgun or Resend for transactional emails
- **Analytics**: Plausible (optional)

### Key Architecture Patterns

#### Authentication Flow
- NextAuth.js handles OAuth and magic links via `/api/auth/[...nextauth]`
- User sessions include role-based access control (user, tienda, admin)
- Protected routes redirect to `/api/auth/signin` when unauthorized
- Successful login redirects to `/dashboard`

#### Role-Based Access Control
The app implements a 3-tier role system:
- **user**: Default role, basic dashboard access
- **tienda**: Store/merchant role, additional tienda dashboard
- **admin**: Full admin access to all areas

#### Payment Integration
- Stripe plans configured in `config.js` with environment-specific pricing
- Webhook at `/api/webhook/stripe` handles subscription events
- User model tracks `customerId`, `priceId`, and `hasAccess` for subscription state

#### Database Architecture
- **MongoDB**: Primary database with connection via `libs/mongo.js`
- **Mongoose**: ODM for schema validation and relationships
- **Models**: User and Lead models with role-based access patterns
- User model includes Stripe integration fields and role enum

### Project Structure

```
app/
├── api/                    # API routes
│   ├── auth/              # NextAuth.js authentication
│   ├── stripe/            # Stripe payment endpoints
│   └── webhook/           # Webhook handlers (Stripe, Mailgun)
├── blog/                  # Blog functionality with dynamic routes
├── dashboard/             # Role-based protected dashboards
│   ├── admin/            # Admin-only pages
│   └── tienda/           # Tienda role pages
└── (pages)/              # Public marketing pages

components/               # Reusable UI components
├── Button*.js           # Various button components
├── Hero.js, Header.js   # Landing page sections
├── Pricing.js           # Subscription pricing display
└── Testimonials*.js     # Social proof components

libs/                    # Service layer utilities
├── next-auth.js         # Authentication configuration
├── stripe.js            # Stripe API wrapper
├── mongo.js             # MongoDB connection
├── mongoose.js          # Mongoose connection
├── mailgun.js           # Email service
└── seo.js              # SEO utilities

models/                  # Mongoose schemas
├── User.js             # User model with roles and Stripe fields
└── Lead.js             # Lead collection model
```

### Configuration Management

#### Central Configuration (`config.js`)
- App branding and SEO settings
- Stripe plan definitions with pricing
- Email service configuration (Mailgun/Resend)
- Theme and color settings (DaisyUI integration)
- Authentication URLs and callbacks

#### Environment Variables
Required variables (see `.env.example`):
- `NEXTAUTH_*`: Authentication secrets and URLs
- `GOOGLE_*`: OAuth credentials
- `MONGODB_URI`: Database connection
- `STRIPE_*`: Payment processing keys
- `MAILGUN_API_KEY` or `RESEND_API_KEY`: Email service

### Development Guidelines

#### Component Patterns
- Most components are functional components using React hooks
- DaisyUI classes provide consistent styling
- Button components handle different states and variants
- Client-side components wrapped in `LayoutClient.js`

#### API Route Patterns
- Stripe webhooks verify signatures and update user access
- Auth routes follow NextAuth.js conventions
- Database operations use both Mongoose (schemas) and native MongoDB (direct queries)

#### Styling Architecture
- TailwindCSS for utility classes
- DaisyUI for pre-built components and themes
- Custom animations and gradients defined in `tailwind.config.js`
- Global styles in `app/globals.css`

### Critical Integration Points

#### Stripe Webhook Security
- Webhook signature verification is implemented for security
- User `hasAccess` field controls feature access based on subscription status
- Failed payments handled through Stripe webhook events

#### Role-Based Dashboard Routing
- Dashboard layouts enforce role-based access
- Admin users can access all dashboard areas
- Tienda users have access to store-specific functionality
- Regular users see basic dashboard only

#### Email System Integration
- Magic link authentication requires email service setup
- Transactional emails use configured sender addresses from `config.js`
- Support email functionality routes through configured support channels