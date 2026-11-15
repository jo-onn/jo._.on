import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${site.handle} — ${site.tagline}`,
  description: site.description,
};

// viewport-fit=cover lets the page use env(safe-area-inset-*) on notched
// phones; resizes-content makes Android Chrome shrink the layout above the
// on-screen keyboard (iOS is handled in HashModal via visualViewport).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

// Applies the saved theme and language before first paint
// (see Next docs: preventing-flash-before-hydration).
const prefsScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("theme"),l=localStorage.getItem("lang");if(t==="light"||t==="dark")d.setAttribute("data-theme",t);if(l==="ko"||l==="en"){d.setAttribute("data-lang",l);d.setAttribute("lang",l)}}catch(e){}})()`;

// Cloudflare Web Analytics (cookie-less visitor stats). The token is public by
// design (it ships in the page); it comes from the CF_BEACON_TOKEN repository
// variable at build time. No token → no script.
const cfBeaconToken = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

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
        {/* Without JS the tiles would stay at their pre-animation opacity:0 */}
        <noscript>
          <style>{`.tile{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {cfBeaconToken && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: cfBeaconToken })}
          />
        )}
      </head>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
