import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import FaqList from "@/components/FaqList";
import { CFG, CATS, CG, P, REVIEWS, waLink, swStyle } from "@/lib/data";

const wa = waLink(`Hi ${CFG.name}, I have a question.`);
const grad = (a) => ({ background: `linear-gradient(135deg,${a[0]},${a[1]})` });

export default function Home() {
  return (
    <>
      <section className="hero"><div className="wrap">
        <div>
          <span className="pill">Chosen by fashion designers</span>
          <h1>Your fabric, at your door. No market stress.</h1>
          <p>We sell all kinds of fabrics. No traffic. No crowds. Just beautiful fabrics.</p>
          <Link className="btn" href="/products">Start shopping</Link>
        </div>
        <div className="collage" aria-hidden="true">
          <div style={grad(CG.Crepe)} /><div style={grad(["#e0242e", "#9c0f1a"])} /><div style={grad(CG.Chiffon)} />
        </div>
      </div></section>

      <section className="s" id="collections"><div className="wrap">
        <div className="hd"><h2>Shop by fabric</h2></div>
        <div className="cats">{CATS.map((c) => (
          <Link key={c} className="cat" href={`/products?category=${c}`}>
            <div className="sw" style={swStyle({ g: CG[c], img: (P.find((p) => p.c === c && p.img) || {}).img })} />{c}
          </Link>))}
        </div>
      </div></section>

      <section className="s alt"><div className="wrap">
        <div className="hd"><div><h2>Today’s picks</h2><p>Fresh this week</p></div><Link href="/products">Shop all →</Link></div>
        {P.length ? <div className="grid">{P.slice(0, 10).map((x) => <ProductCard key={x.id} x={x} />)}</div>
          : <p>Our fabrics are being added. <a href={waLink(`Hi ${CFG.name}, what fabrics do you have?`)}>Ask us on WhatsApp</a> to see what is available.</p>}
      </div></section>

      {REVIEWS.length > 0 && (
        <section className="s"><div className="wrap">
          <div className="hd"><h2>What our customers are saying</h2></div>
          <div className="rev">{REVIEWS.map((r, i) => <blockquote key={i}>“{r[0]}”<cite>{r[1]}</cite></blockquote>)}</div>
        </div></section>
      )}

      <section className="s alt"><div className="wrap faqbox">
        <div className="faqimg" style={grad(["#f6c9d0", "#8c3b4f"])} role="img" aria-label="Fabric swatch" />
        <div><h2 style={{ marginBottom: 10 }}>Frequently asked questions</h2><FaqList /></div>
      </div></section>

      <section className="s"><div className="wrap">
        <div className="hd"><div><h2>Follow us for new arrivals</h2><p>Fresh fabrics, styling ideas and customer looks — every week.</p></div></div>
        <p className="soc">{["Instagram", "YouTube", "TikTok", "Facebook"].map((s) => <a key={s} className="btn sm alt" href="#">{s}</a>)}</p>
      </div></section>

      <section className="cta"><div className="wrap">
        <h2>Talk to a fabric expert</h2>
        <p>Not sure what to buy? Call or WhatsApp us, Monday to Saturday, 9am to 7pm.</p>
        <a className="btn" style={{ background: "#f7efe3", color: "#240710" }} href={`tel:${CFG.tel}`}>Call {CFG.phone}</a>
        <a className="btn wa" href={wa}>Chat on WhatsApp</a>
      </div></section>
    </>
  );
}
