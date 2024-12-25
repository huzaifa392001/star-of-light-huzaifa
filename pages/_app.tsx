import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function App({ Component, pageProps }: AppProps) {
  const lenisSetup = () => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    lenis.scrollTo(document.querySelector<HTMLElement>("#home") || 0);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = this.getAttribute("href");
        if (target) lenis.scrollTo(target);
      });
    });
  };

  useEffect(() => {
    lenisSetup();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
