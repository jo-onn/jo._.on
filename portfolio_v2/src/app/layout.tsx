import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${site.handle} — ${site.tagline}`,
  description: site.description,
};

// Applies the saved theme and language before first paint
// (see Next docs: preventing-flash-before-hydration).
const prefsScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("theme"),l=localStorage.getItem("lang");if(t==="light"||t==="dark")d.setAttribute("data-theme",t);if(l==="ko"||l==="en"){d.setAttribute("data-lang",l);d.setAttribute("lang",l)}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
      </head>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
