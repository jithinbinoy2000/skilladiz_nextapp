import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/components/auth/SessionProvider";
import Script from "next/script";

const projectId = "w4zyc5dhj2";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Skilladiz",
  description: "Skilladiz - The ultimate gaming arena experience",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${rajdhani.variable} antialiased`}>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${projectId}");
          `}
        </Script>
        <div className="w-full text-black bg-white">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] sm:flex-row sm:text-left">
            <span>
              Demo site in testing. Visit the official Skilladiz website for the live
              experience.
            </span>
            <a
              href="https://skilladiz.com/"
              className="rounded-full border border-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:bg-black hover:text-white"
            >
              Go to Official Site
            </a>
          </div>
        </div>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
