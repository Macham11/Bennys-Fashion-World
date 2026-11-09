# Benny’s Fashion World website

A static website: no build step or database needed.

## Open it
Unzip and double-click `index.html`.

## Put it online (free)
- Vercel or Netlify: drag and drop this folder, or push it to GitHub and import the repo.
- After you have a domain, replace `YOUR-DOMAIN` in `sitemap.xml` and `robots.txt`.

## Things you must edit
Open `assets/app.js` and edit the top of the file:
1. `P`: add your own products (name, category, price per yard, stock, "good for" text). The shop is empty until you do. Set stock to 0 for "Sold out".
2. `CFG.bank`: add your bank name, account number and account name. Until then, checkout tells customers you will send your account details on WhatsApp.
3. `REVIEWS`: add your real customer reviews. The reviews section stays hidden until you do.
3b. `CFG.freeShip`: set a free-delivery amount if you want a progress bar in the cart.
4. Social links: search for `href="#"` in `build.py` output (the HTML files) and add your Instagram, YouTube, TikTok and Facebook links.
5. Policy pages (privacy, terms, returns) are starter text. Have them reviewed.

## How orders work
Customers fill in the checkout form, then send the order to your WhatsApp (09039953015) with one tap. Orders are not stored on a server, so confirm each one on WhatsApp.

## Not included yet
Admin dashboard, Supabase database and Paystack. Ask Claude to add them as a next step.
