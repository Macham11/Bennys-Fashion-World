import Prose from "@/components/Prose";
export const metadata = { title: "Terms of service | Benny’s Fashion World" };
export default function Page() {
  return <Prose title="Terms of service" intro="Starter text. Edit it to match how you run your business." secs={[
    ["Orders", "An order is confirmed once we confirm your bank transfer."],
    ["Prices", "Prices are in Naira (₦) per yard."],
    ["Colours", "We film fabrics in daylight, but colours can look slightly different on different screens. Ask for a live video before you pay."],
    ["Delivery", "Delivery time and cost depend on your location. We confirm them on WhatsApp before you pay."]]} />;
}
