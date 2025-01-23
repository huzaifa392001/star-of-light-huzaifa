import { Star } from "../Svg/Svg";
import s from "./footer.module.scss";
import Elements from "./Elements";
import CustomLink from "./CustomLink";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { memo } from "react";
import { useRouter } from "next/router";
import Lenis from "lenis";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Footer = () => {
  const container = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container?.current,
            start: "top center",
            toggleActions: "play none none reverse",
            fastScrollEnd: true,
            preventOverlaps: true,
          },
          defaults: { ease: "power4.inOut" },
        })
        .from(".footer-star-2", { scale: 0, rotate: 360 })
        .from(".footer-path-1 path", { xPercent: 100, stagger: 0.1 }, "<0.2")
        .from(".footer-path-5 ", { yPercent: 100 }, "<0.2")
        .from(
          ".footer-nav-1 a",
          { clipPath: "inset(100% 0% 0% 0%)", stagger: 0.1 },
          "<0.2"
        )
        .from(".footer-nav-2 a", {
          clipPath: "inset(100% 0% 0% 0%)",
          stagger: 0.1,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (container?.current && starRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container?.current!.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        gsap.to(starRef.current, {
          x: -(x * 0.1),
          y: -(y * 0.1),
          ease: "power2.out",
          duration: 0.4,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(starRef.current, {
          x: 0,
          y: 0,
          ease: "elastic.out(1.2, 0.4)",
          duration: 0.7,
        });
      };

      container?.current?.addEventListener("mousemove", handleMouseMove);
      container?.current?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container?.current?.removeEventListener("mousemove", handleMouseMove);
        container?.current?.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

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

  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     scrollToTop();
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  useEffect(() => {
    setTimeout(() => {
      scrollToTop();
      ScrollTrigger.refresh();
    }, 1500);
  });

  return (
    <footer ref={container} id="footer" className={s.main}>
      {/* <Elements /> */}
      <div ref={starRef} className={`footer-star-2 ${s.star}`}>
        <Star />
      </div>
      {/* <nav className={`footer-nav-1 ${s.nav}`}>
        <CustomLink href="/" text="Work" />
        <CustomLink href="/" text="Archive" />
        <CustomLink href="/" text="Clients" />
        <CustomLink href="/" text="Services" />
        <CustomLink href="/" text="About" />
        <CustomLink href="/" text="Contact" />
      </nav> */}
      <div className={`footer-nav-2 ${s.nav}`}>
        <CustomLink href="https://www.linkedin.com/unknown" text="Linkedin" />
        {/* <CustomLink
          href="https://www.instagram.com/mudassir"
          text="Instagram"
        /> */}
        <CustomLink href="https://www.Twitter.net/unknown" text="Twitter" />
        <CustomLink href="https://www.behance.net/unknown" text="Behance" />
      </div>
      <div className={s.foot}>
        {/* Left-aligned text */}
        <p
          className={`${s.footerText} ${s.left}`}
          onClick={() => handleNavigation("/leftPage")} // Replace with your desired path
        >
          Imprint
        </p>

        {/* Center text */}
        <p className={s.centerText}>From Berlin & Vienna with Heart</p>

        {/* Right-aligned text */}
        <p
          className={`${s.footerText} ${s.right}`}
          onClick={() => handleNavigation("/rightPage")} // Replace with your desired path
        >
          Data protection
        </p>
      </div>
    </footer>
  );
};

export default memo(Footer);
