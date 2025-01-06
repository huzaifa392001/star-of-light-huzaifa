import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";

gsap.registerPlugin(ScrollTrigger);

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Layout>
      <div id="home" />
      <Component {...pageProps} />
    </Layout>
  );
}
