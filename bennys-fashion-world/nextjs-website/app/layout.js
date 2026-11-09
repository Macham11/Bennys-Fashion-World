import "./globals.css";
import { Playfair_Display } from "next/font/google";
import Shell from "@/components/Shell";

const serif = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-serif", display: "swap" });

const DESC = "Shop all kinds of fabrics online from Benny’s Fashion World in Jos, Plateau State, including lace, Ankara, silk, satin, chiffon and linen. We deliver across Nigeria.";
export const metadata = {
  title: "Benny’s Fashion World | All Kinds of Fabrics Online in Nigeria",
  description: DESC,
  openGraph: { title: "Benny’s Fashion World", description: DESC, type: "website" },
};
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#240710", viewportFit: "cover" };

const ld = { "@context": "https://schema.org", "@type": "ClothingStore", name: "Benny’s Fashion World", telephone: "+2349039953015", email: "machambwehb@gmail.com", address: { "@type": "PostalAddress", addressLocality: "Jos", addressRegion: "Plateau State", addressCountry: "NG" }, openingHours: "Mo-Sa 09:00-19:00" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={serif.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
