import { P } from "@/lib/data";
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://YOUR-DOMAIN";
export default function sitemap() {
  return ["", "/products", "/about", "/contact", "/faq", "/privacy", "/terms", "/returns"].concat(P.map((x) => `/products/${x.id}`)).map((p) => ({ url: base + p }));
}
