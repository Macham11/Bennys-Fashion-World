const base = process.env.NEXT_PUBLIC_SITE_URL || "https://YOUR-DOMAIN";
export default function robots() { return { rules: { userAgent: "*", allow: "/" }, sitemap: base + "/sitemap.xml" }; }
