import Link from "next/link";
import Prose from "@/components/Prose";
import { CFG, waLink } from "@/lib/data";
export const metadata = { title: "About us | Benny’s Fashion World" };
export default function About() {
  return (
    <Prose title={`About ${CFG.name}`} intro="We sell all kinds of fabrics from Jos, Plateau State and deliver them across Nigeria, so you can skip the market traffic and crowds."
      secs={[["What we sell", "All kinds of fabrics, including lace, Ankara, silk, satin, cotton, crepe, chiffon, linen, mesh and organza, sold by the yard for designers, tailors and anyone sewing for an occasion."],
             ["How we work", "We film fabrics in daylight, send a live video on request, and help you work out how many yards you need. Ask us anything on WhatsApp."]]}>
      <p><Link className="btn" href="/products">Start shopping</Link> <a className="btn wa" href={waLink(`Hi ${CFG.name}, I have a question.`)}>Chat on WhatsApp</a></p>
    </Prose>
  );
}
