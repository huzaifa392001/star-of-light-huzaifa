import Lenis from "lenis";
import React, { ReactNode, useEffect, useRef } from "react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const lenisRef = useRef<any>(null); // Using ref to persist Lenis instance

  const lenisSetup = () => {
    if (window.innerWidth <= 768) return; // Disable Lenis for small screens

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis; // Assign instance to ref

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    document
      .querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
      .forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = this.getAttribute("href");
          if (target) lenis.scrollTo(target);
        });
      });
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0); // Use Lenis for smooth scroll
      console.log("Lenis scrolled to top");
    } else {
      window.scrollTo(0, 0); // Fallback for normal scrolling
      console.log("Window scrolled to top");
    }
  };

  useEffect(() => {
    lenisSetup();
  }, []);
  return <>{children}</>;
};

export default Wrapper;
