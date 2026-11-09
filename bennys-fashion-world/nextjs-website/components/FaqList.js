import { FAQ } from "@/lib/data";
export default function FaqList() {
  return FAQ.map(([q, b, r]) => (
    <details key={q}><summary>{q}</summary><p><b>{b}</b> {r}</p></details>
  ));
}
