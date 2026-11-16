# Men's Fashion Store

A mobile-first men's fashion storefront built with React, TypeScript and Vite.

## Current features
- Men's shirts, trousers and football/soccer jerseys
- Product search and category filtering
- Responsive product catalogue
- Product detail modal with descriptions, sizes, colours and stock display
- Cart with size/colour variants, quantity controls, item removal and subtotal calculation
- Customer delivery-details form prepared for payment integration
- No WhatsApp checkout; online payments will be integrated later
- SEO-ready page metadata
- Automated GitHub Actions build check

## Development

```bash
npm install
npm run dev
npm run build
```

## Next development steps
- Replace demo products, prices, images and stock with the seller's real catalogue
- Add the real store name, logo, favicon and contact details
- Connect Supabase for product catalogue, inventory and order records
- Build a secure server-side payment integration for Flutterwave or Paystack
- Verify payment status server-side before confirming orders
- Add an admin dashboard for products, inventory and orders
- Add shipping/delivery fee rules and customer order notifications
- Deploy to Vercel and connect the store domain

## Payment security

The current checkout is a UI foundation only. It does not create orders, collect card details or process payments. When a payment provider is selected, secret keys and payment verification must run on a trusted server/edge function, not in browser code.
