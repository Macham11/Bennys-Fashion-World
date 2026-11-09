import Prose from "@/components/Prose";
import FaqList from "@/components/FaqList";
import { CFG, waLink } from "@/lib/data";
export const metadata = { title: "FAQ | Benny’s Fashion World" };
export default function Faq() {
  return (
    <Prose title="Frequently asked questions">
      <FaqList />
      <p style={{ marginTop: 20 }}><a className="btn wa" href={waLink(`Hi ${CFG.name}, I have a question.`)}>Still have a question? WhatsApp us</a></p>
    </Prose>
  );
}
