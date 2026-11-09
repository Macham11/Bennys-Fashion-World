import Prose from "@/components/Prose";
import { CFG, waLink } from "@/lib/data";
export const metadata = { title: "Contact us | Benny’s Fashion World" };
export default function Contact() {
  return (
    <Prose title="Contact us" intro="Talk to a real person, Monday to Saturday, 9am to 7pm.">
      <div className="box" style={{ margin: "16px 0" }}>
        <p><b>Phone:</b> <a href={`tel:${CFG.tel}`}>{CFG.phone}</a></p>
        <p><b>WhatsApp:</b> <a href={waLink(`Hi ${CFG.name}, I have a question.`)}>Chat with us</a></p>
        <p><b>Email:</b> <a href={`mailto:${CFG.email}`}>{CFG.email}</a></p>
        <p><b>Location:</b> Jos, Plateau State, Nigeria</p>
      </div>
      <h2>Send a message</h2>
      <form className="form" action={`mailto:${CFG.email}`} method="post" encType="text/plain">
        <input name="name" placeholder="Your name" required /><input name="phone" placeholder="Phone number" />
        <textarea name="message" rows={4} placeholder="How can we help?" required /><button className="btn">Send message</button>
      </form>
    </Prose>
  );
}
