import Prose from "@/components/Prose";
export const metadata = { title: "Return policy | Benny’s Fashion World" };
export default function Page() {
  return <Prose title="Return policy" intro="Starter text. Edit it to match how you run your business." secs={[
    ["Cancellations", "You can cancel before your fabric is cut. Message us on WhatsApp for a refund or exchange."],
    ["Cut fabric", "Fabric that has been cut to your order cannot be returned unless it arrives damaged or wrong."],
    ["Damaged or wrong items", "Contact us on WhatsApp as soon as you receive your order, with photos, and we will make it right."]]} />;
}
