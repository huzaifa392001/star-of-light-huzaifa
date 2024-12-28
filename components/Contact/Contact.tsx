import Link from "next/link";
import s from "./contact.module.scss";
// import Elements from "./Elements";
// import { ContactHeading, ContactPathOne } from "../Svg/Svg";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { memo } from "react";
import Image from "next/image";

const Contact = () => {
  const container = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLDivElement>(null);
  const elementAnimation = useRef<SVGSVGElement>(null);
  let mm = gsap.matchMedia();

  useEffect(() => {
    if (heading.current) {
      const words = heading.current.querySelectorAll(".word");

      words.forEach((word, index) => {
        const letters = word.querySelectorAll(".letter");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heading.current,
            start: "top 90%",
            end: "bottom top",
            scrub: true,
          },
        });

        tl.fromTo(
          word,
          {
            opacity: 0,
            rotationZ: 0,
            rotationY: -90,
            transformPerspective: 1000,
            transformOrigin: "50% 50%",
          },
          {
            opacity: 1,
            rotationZ: 0,
            rotationY: 0,
            duration: 1.0,
            ease: "power3.out",
            delay: index * 0.3,
          }
        ).to(word, {
          rotationY: 90,
          rotationZ: 4,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.02,
        });

        tl.fromTo(
          letters,
          {
            opacity: 0,
            rotationY: -90,
            transformPerspective: 1000,
            transformOrigin: "50% 50%",
          },
          {
            opacity: 1,
            rotationY: 0,
            stagger: {
              each: 0.1,
              from: "end",
            },
            duration: 1,
            ease: "power3.out",
          },
          0
        );
      });
    }
  }, []);

  useGSAP(
    () => {
      const timeline1 = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
          fastScrollEnd: true,
          preventOverlaps: true,
        },
        defaults: {
          ease: "power4.inOut",
        },
      });

      timeline1
        .from(".contact-heading path", {
          strokeDashoffset: 1290,
          duration: 1,
          ease: "none",
        })
        .to(".contact-heading path", {
          duration: 1,
          fill: "black",
          ease: "power3.inOut",
        })
        .from(
          ".contact-path-2",
          {
            xPercent: 70,
            duration: 1,
            ease: "power4.inOut",
          },
          "<0.6"
        )
        .to(
          ".contact-path-3 path",
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power4.inOut",
          },
          "<0.2"
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top center",
            toggleActions: "play none none reverse",
            fastScrollEnd: true,
            preventOverlaps: true,
          },
          defaults: {
            ease: "power4.inOut",
          },
        })
        .from(".contact-grid p", {
          clipPath: "inset(100% 0% 0% 0%)",
          stagger: 0.2,
          duration: 1,
        })
        .from(".contact-path-1", {
          scale: 0,
          duration: 1,
        });
    },
    { scope: container }
  );

  useGSAP(() => {
    mm.add("(min-width: 800px)", () => {
      // Animation for desktop only
      setTimeout(() => {
        if (elementAnimation.current) {
          let tl = gsap.timeline({
            defaults: { ease: "none", duration: 1 },
            scrollTrigger: {
              trigger: heading.current,
              start: "top center",
              scrub: true,
              toggleActions: "play none reverse none",
            },
          });
          tl.to(".contact .shape", {
            scale: 1,
            motionPath: {
              path: ".contact #path",
              align: ".contact #path",
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            transformOrigin: "50% 50%",
            ease: "none",
            stagger: 0.05,
          })
        }
      }, 1500);
    });
  }, { scope: elementAnimation });

  return (
    <section ref={container} id="contact" className={s.main}>
      {/* <Elements /> */}
      <svg className={`contact ${s.svgElement}`} ref={elementAnimation} width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="path" className={`${s.SVGline}`} d="M332 -113.5C44.4731 -54.1626 -28.123 604.222 345.571 336.091C719.265 67.9599 1027.65 8.34432 1487.97 56.556C1801.35 127.019 2144.38 656.698 1698.85 837.678C1253.32 1018.66 1158 1002.5 997.5 941C349.5 770.742 -147.333 1150.23 -310.5 1306.5" stroke="black" />
        <path className={`shape ${s.shape}`} d="M137.55 -182.37C105.965 -107.178 141.522 -11.8251 215.419 27.0054C289.317 65.8349 391.547 43.1254 440.566 -22.8237C588.2 -221.461 232.806 -409.155 137.55 -182.37Z" fill="#FF9293" />
        <path className={`shape ${s.shape}`} d="M196.356 69.117C180.05 59.061 164.842 47.077 149.837 35.109C129.91 19.21 109.292 2.07199 100.058 -21.675C81.3688 -69.719 101.986 -157.363 136.213 -194.786C158.445 -219.098 204.65 -235.953 235.584 -246.151C271.833 -258.103 311.343 -260.406 348.611 -251.931C407.986 -238.413 460.588 -197.747 488.574 -143.704C498.342 -124.828 505.303 -104.009 504.99 -82.768C504.582 -55.057 491.882 -28.881 476.078 -6.104C448.359 33.841 409.585 66.737 364.086 83.968C318.587 101.199 266.33 101.966 221.74 82.527C212.944 78.689 204.524 74.146 196.372 69.102L196.356 69.117Z" fill="#FF82BA" />
        <path className={`shape ${s.shape}`} d="M493.407 -4.76201C486.623 11.256 476.761 26.416 462.641 36.578C445.214 49.132 423.224 52.902 402.29 57.654C355.981 68.169 310.224 85.122 262.751 83.942C215.278 82.761 163.824 57.102 151.772 11.118C138.572 -39.25 175.876 -87.165 193.012 -136.322C199.168 -153.964 202.981 -172.879 213.701 -188.192C261.051 -255.788 342.03 -193.449 398.232 -177.232C478.093 -154.194 529.118 -89.035 493.407 -4.76201Z" fill="#C19280" />
        <path className={`shape ${s.shape}`} d="M305.241 41.416C310.656 40.954 316.014 40.568 321.293 40.328C390.009 37.223 474.792 -11.841 477.609 -101.015C479.25 -153.01 476.962 -210.95 446.152 -247.856C426.883 -270.941 399.466 -281.569 372.556 -287.308C348.003 -292.543 322.556 -294.329 298.229 -287.763C234.65 -270.605 191.731 -201.972 154.607 -138.178C140.618 -114.138 126.115 -88.363 125.059 -59.143C123.383 -12.817 157.565 26.586 195.05 39.19C230.168 51 268.993 44.512 305.241 41.416Z" fill="#D6C2E4" />
        <path className={`shape ${s.shape}`} d="M467.162 -128.344C464.961 -133.481 462.35 -138.745 459.288 -144.193C441.918 -175.142 410.424 -195.987 377.321 -208.788C344.217 -221.588 308.913 -227.403 274.385 -235.631C259.696 -239.131 244.922 -243.111 229.824 -242.998C198.244 -242.758 168.584 -223.945 150.396 -198.118C132.207 -172.292 124.461 -140.269 123.177 -108.698C122.034 -80.374 126.224 -50.736 142.127 -27.267C150.636 -14.706 162.079 -4.48801 173.396 5.603C191.048 21.325 208.686 37.032 226.338 52.754C235.863 61.236 245.529 69.817 256.902 75.575C294.238 94.486 350.962 79.216 380.397 52.994C387.452 46.714 394.888 40.927 402.48 35.31C417.056 24.514 432.041 13.873 443.682 -0.197998C453.602 -12.18 461.236 -25.855 466.471 -40.505C478.38 -73.853 479.706 -98.989 467.148 -128.315L467.162 -128.344Z" fill="#FF8D7C" />
        <path className={`shape ${s.shape}`} d="M169.435 -205.607C148.818 -175.99 129.93 -144.503 120.322 -109.71C110.714 -74.918 111.159 -36.205 127.924 -4.24402C151.965 41.593 203.46 65.0269 252.202 82.339C278.731 91.765 306.571 100.469 334.55 97.357C379.842 92.322 416.03 57.618 443.47 21.2C463.003 -4.72002 480.492 -33.695 484.255 -65.94C490.402 -118.637 457.735 -169.858 414.466 -200.498C339.416 -253.643 230.234 -292.948 169.435 -205.607Z" fill="#83D398" />
        <path className={`shape ${s.shape}`} d="M464.472 -3.17603C457.726 12.736 447.919 27.796 433.879 37.891C416.55 50.362 394.683 54.108 373.867 58.828C327.818 69.273 282.318 86.114 235.112 84.942C187.906 83.769 136.741 58.28 124.757 12.599C111.63 -37.436 148.725 -85.035 165.765 -133.868C171.886 -151.394 175.678 -170.183 186.337 -185.395C233.422 -252.545 313.946 -190.618 369.832 -174.508C449.244 -151.622 499.983 -86.893 464.472 -3.17603Z" fill="#FFD95D" />
        <path className={`shape ${s.shape}`} d="M385.912 -66.1493C385.749 -69.0705 385.624 -71.9596 385.576 -74.8041C384.958 -111.831 360.288 -158.176 313.197 -160.996C285.739 -162.64 255.081 -162.256 235.115 -146.215C222.627 -136.182 216.601 -121.583 213.167 -107.185C210.035 -94.0479 208.712 -80.379 211.819 -67.1911C219.942 -32.724 255.578 -8.62201 288.744 12.29C301.242 20.17 314.649 28.352 330.078 29.348C354.539 30.927 375.874 13.108 383.094 -6.881C389.86 -25.607 387.008 -46.597 385.912 -66.1493Z" fill="#88C4D2" />
      </svg>
      <div ref={heading} className={`contact-heading ${s.heading}`}>
        {/* <ContactHeading /> */}
        <div className="word">
          {"Let's".split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
        <div className="word">
          {"Work".split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
        <div className="word">
          {"Together".split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
      </div>
      <div className={`contact-grid ${s.grid}`}>
        {/* <p>
          Lets start a project together
          <span className={`contact-path-1 ${s.pathOne}`}>
            { <ContactPathOne /> }
          </span>
        </p> */}
        <div className={s.box}>
          <p>
            Mail:{" "}
            <Link scroll={false} href="mailto:mudassirarid@gmail.com">
              ceo.mudassir@devrolin.com
            </Link>
          </p>
          <p>
            Phone:{" "}
            <Link scroll={false} href="tel:+92137837237327">
              +92137837237327
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
