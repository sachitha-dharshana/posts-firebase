import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Montserrat } from "@next/font/google";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={montserrat.className}>
      <Navbar />
      <div className="p-8 w-[50%] m-auto">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
