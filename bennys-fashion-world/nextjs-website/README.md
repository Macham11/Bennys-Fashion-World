# Benny’s Fashion World (Next.js)

## Run it on your computer
1. Install Node.js 18 or newer from nodejs.org.
2. In this folder run: `npm install` then `npm run dev`.
3. Open http://localhost:3000

## Put it online
Push this folder to GitHub, then import the repository on vercel.com. Vercel builds it automatically.
After you have a domain, add an environment variable `NEXT_PUBLIC_SITE_URL` (for example `https://yourdomain.com`) for the sitemap.

## Add your products and photos
Open `lib/data.js`. Everything you edit is at the top of that file:
- `P`: your products. Put your photos in `public/images/` and set `img:"/images/your-photo.jpg"` on each product. Set `s:0` for "Sold out".
- `CFG.bank`: your bank name, account number and account name for checkout.
- `REVIEWS`: your real customer reviews (the reviews section stays hidden until you add some).
- `CFG.freeShip`: a ₦ amount for a free-delivery bar, or 0 to hide it.
Social media links: search for `href="#"` in `components/Shell.js` and `app/page.js`.

## How orders work
Customers fill in the checkout form, then send the order to your WhatsApp with one tap. Orders are not stored on a server, so confirm each one on WhatsApp.

## Not included yet
Admin dashboard, Supabase database and Paystack.
