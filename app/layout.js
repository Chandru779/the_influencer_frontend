import { Geist, Geist_Mono, Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata = {
  title: "Influencer",
  description: "Drop the true facts , let it help others and evreyone to grow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${lato.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
