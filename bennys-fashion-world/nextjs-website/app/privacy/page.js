import Prose from "@/components/Prose";
export const metadata = { title: "Privacy policy | Benny’s Fashion World" };
export default function Page() {
  return <Prose title="Privacy policy" intro="Starter text. Edit it to match how you run your business." secs={[
    ["What we collect", "When you order, we collect your name, phone number, email and delivery address so we can process and deliver your order."],
    ["How we use it", "We use your details only to confirm payment, deliver your order and keep you updated. We do not sell your information."],
    ["Your cart", "Your cart is saved in your browser so it stays after you refresh the page."],
    ["Contact", "Questions? Email machambwehb@gmail.com or call 09039953015."]]} />;
}
