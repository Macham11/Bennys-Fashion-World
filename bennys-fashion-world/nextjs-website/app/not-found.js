import Link from "next/link";
export default function NotFound() {
  return <div className="wrap"><div className="prose"><h1>We couldn’t find that page</h1><p>It may have moved or the fabric may no longer be listed.</p><p><Link className="btn" href="/products">See all fabrics</Link></p></div></div>;
}
