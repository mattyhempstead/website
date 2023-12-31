import "../app/globals.css";
import Header from "@/components/header";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

// NOTE: Layout code here is most copied from app/layout.tsx with some modifications
// because the pages router doesn't support layouts like the app router does.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`
      ${inter.className}
      bg-slate-900 text-slate-400
      [&_h1]:text-slate-200
      [&_h2]:text-slate-200
      [&_h3]:text-slate-200
      [&_h4]:text-slate-200
  `}
    >
      <Header />
      <div className="px-4 pt-12 pb-16">
        <div className="max-w-[40rem] mx-auto">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}
