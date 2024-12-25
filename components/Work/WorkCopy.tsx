import { useEffect, useRef, useState } from "react";
import Elements from "./Elements";
import s from "./work.module.scss";
import { data as importedData } from "@/components/Work/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { WorkHeading } from "../Svg/Svg";
import Image from "next/image";
import { useSnapshot } from "valtio";
import { store } from "@/store";
// import Preloader from "../Preloader/Preloader";
import { useRouter } from "next/router";
import { memo } from "react";
import Link from "next/link";
import HeadingElement from "../HeadingElementAnimation/HeadingElement";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface WorkData {
  id: number;
  name: string;
}

// Data array for work items
const data: WorkData[] = [
  { id: 0, name: "Bauhaus Tapete" },
  { id: 1, name: "Everphone" },
  { id: 2, name: "Monipol" },
  { id: 3, name: "Myndyoga" },
  { id: 4, name: "Vermietet.de" },
  { id: 5, name: "WWTF" },
  { id: 6, name: "Thyssen-Bornemisza" },
];

// Define a mapping of ids to paths
const workPaths: { [key: number]: string } = {
  0: "/work/bauhas",
  1: "/work/everphone",
  2: "/work/monipol",
  3: "/work/myndyoga",
  4: "/work/vermietet",
  5: "/work/wwtf",
  6: "/work/Thyssen",
};

const Work = () => {
  const container = useRef<HTMLElement>(null);
  const heading = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState<number>(1);
  // const [loading, setLoading] = useState(false);
  const router = useRouter();
  const elementImages = ["1.svg", "2.svg", "3.svg", "4.svg", "5.svg", "6.svg", "7.svg", "8.svg"];
  const mm = gsap.matchMedia(); // GSAP MatchMedia Instance
  const elementAnimation = useRef<SVGSVGElement>(null);
  useGSAP(() => {
    mm.add("(min-width: 800px)", () => {
      // Animation for desktop only
      setTimeout(() => {
        if (elementAnimation.current) {
          let tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: elementAnimation.current,
              start: "top center",
              toggleActions: "play none reverse none",
            },
          });
          tl.to('.workSvg .shape', {
            scale: 1,
            stagger: 0.5
          }).to(".workSvg .shape", {
            motionPath: {
              path: ".workSvg #path",
              align: ".workSvg #path",
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            duration: 5,
            ease: "none",
            stagger: 0.5,
          }, "<")
        }
      }, 1500);
    });
  }, { scope: elementAnimation });

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
            rotationY: 0,
            rotationZ: 0,
            duration: 1.0,
            ease: "power3.out",
            delay: index * 0.6,
          }
        )
          .to(word, {
            rotationY: 89,
            rotationZ: 8,
            opacity: 1,
            duration: 2.0,
            ease: "power3.out",
            delay: 0.5,
          })

          .fromTo(
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
      let mm = gsap.matchMedia();

      mm.add(
        { isDesktop: `(min-width: 800px)`, isMobile: `(max-width: 799px)` },
        (context) => {
          let { isDesktop } = context.conditions as { isDesktop: boolean };

          gsap
            .timeline({
              scrollTrigger: {
                trigger: container.current!,
                start: "top 40%",
                toggleActions: "play none none reverse",
                fastScrollEnd: isDesktop,
                preventOverlaps: isDesktop,
              },
              defaults: {
                ease: "power1.out", // Change ease to a slower one for smoother effect
              },
            })
            .from(".work-heading path", {
              strokeDashoffset: 2340,
              duration: 2, // Increased duration
              ease: "none",
            })
            .to(".work-heading path", {
              duration: 2, // Increased duration
              fill: "black",
              ease: "power1.inOut", // Adjust easing
            });

          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: `.slider`,
              start: isDesktop ? "top+=100 top" : "top top",
              end: "+=20000",
              scrub: 2.5, // Slower scrub rate for smoother scrolling effect
              pin: true,
              pinSpacing: true,
            },
            defaults: { ease: "none" }, // Use slower easing
          });

          data.forEach((_, i) => {
            tl.call(() => setCounter(i + 1))
              .to(`.slide-${i - 1}`, { yPercent: -100 })
              .from(`.slide-${i}`, { yPercent: i === 0 ? 0 : 100, duration: 2 }, "<")
              .from(`.work-path-${i + 1}`, {
                scale: 0,
                duration: 2.5, // Increased duration for slower scaling effect
                ease: "none", // Slower easing
              })
              .from(
                `.image-${i}`,
                {
                  left: isDesktop ? "110%" : "80%",
                  top: isDesktop ? "60%" : "100%",
                  rotate: -40,
                  duration: 9.5, // Increased duration for slower movement
                },
                "<"
              )
              // .from(
              //   `.heading-${i}`,
              //   {
              //     scale: 1,
              //     duration: 1.5, // Slightly slower
              //     ease: "none", // Adjust easing
              //   },
              //   "-=10"
              // ) // Heading animation starts with image animation
              .to(`.element-${i} .svgImageElement`, {
                motionPath: {
                  path: `.element-${i} #workPath-${i}`,
                  align: `.element-${i} #workPath-${i}`,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: true,
                },
                transformOrigin: "50% 50%",
                scale: 1,
                duration: 5,
                ease: "none",
                stagger: 0.5,
              }, "<")// Image starts moving immediately
              .to(
                `.heading-${i}`,
                {
                  scale: 1.1,
                  duration: 5.5, // Slow down to match image movement
                  ease: "none",
                },
                "<"
              ) // Heading scaling happens simultaneously
              .to(`.element-${i} .svgImageElement`, {
                scale: 0,
                stagger: 0.5,
              }, "<")// Image starts moving immediately
              .call(() => setCounter(i + 1))
              .to(`.work-path-${i + 1}`, {
                scale: 0,
                duration: 1.5, // Increased duration for slower scale-down
                ease: "none",
              });
          });
        }
      );
    },
    { scope: container }
  );

  const { workHeadingPointerEnter, workHeadingPointerLeave } = useSnapshot(store);

  const handleCardClick = (id: number) => {
    const path = workPaths[id];
    if (path) {
      router.push(path);
    } else {
      console.error("Path not found for id:", id);
    }
  };

  return (
    <section id="work" ref={container} className={s.main}>
      {/* {loading && <Preloader />}  */}
      <svg className={`workSvg ${s.svgElement}`} ref={elementAnimation} width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="path" className={`${s.SVGline}`} d="M332 -113.5C44.4731 -54.1626 -28.123 604.222 345.571 336.091C719.265 67.9599 1027.65 8.34432 1487.97 56.556C1801.35 127.019 2144.38 656.698 1698.85 837.678C1253.32 1018.66 787.897 1030.37 635.819 1070.86C350.711 1111.65 -152.204 1023.2 44.4389 658.275C241.082 293.349 59.5034 -74.6273 -5.5 -142" stroke="black" />
        <path className={`shape ${s.shape}`} d="M137.55 -182.37C105.965 -107.178 141.522 -11.8251 215.419 27.0054C289.317 65.8349 391.547 43.1254 440.566 -22.8237C588.2 -221.461 232.806 -409.155 137.55 -182.37Z" fill="#FF9293" />
        <path className={`shape ${s.shape}`} d="M196.356 69.117C180.05 59.061 164.842 47.077 149.837 35.109C129.91 19.21 109.292 2.07199 100.058 -21.675C81.3688 -69.719 101.986 -157.363 136.213 -194.786C158.445 -219.098 204.65 -235.953 235.584 -246.151C271.833 -258.103 311.343 -260.406 348.611 -251.931C407.986 -238.413 460.588 -197.747 488.574 -143.704C498.342 -124.828 505.303 -104.009 504.99 -82.768C504.582 -55.057 491.882 -28.881 476.078 -6.104C448.359 33.841 409.585 66.737 364.086 83.968C318.587 101.199 266.33 101.966 221.74 82.527C212.944 78.689 204.524 74.146 196.372 69.102L196.356 69.117Z" fill="#FF82BA" />
        <path className={`shape ${s.shape}`} d="M493.407 -4.76201C486.623 11.256 476.761 26.416 462.641 36.578C445.214 49.132 423.224 52.902 402.29 57.654C355.981 68.169 310.224 85.122 262.751 83.942C215.278 82.761 163.824 57.102 151.772 11.118C138.572 -39.25 175.876 -87.165 193.012 -136.322C199.168 -153.964 202.981 -172.879 213.701 -188.192C261.051 -255.788 342.03 -193.449 398.232 -177.232C478.093 -154.194 529.118 -89.035 493.407 -4.76201Z" fill="#C19280" />
        <path className={`shape ${s.shape}`} d="M305.241 41.416C310.656 40.954 316.014 40.568 321.293 40.328C390.009 37.223 474.792 -11.841 477.609 -101.015C479.25 -153.01 476.962 -210.95 446.152 -247.856C426.883 -270.941 399.466 -281.569 372.556 -287.308C348.003 -292.543 322.556 -294.329 298.229 -287.763C234.65 -270.605 191.731 -201.972 154.607 -138.178C140.618 -114.138 126.115 -88.363 125.059 -59.143C123.383 -12.817 157.565 26.586 195.05 39.19C230.168 51 268.993 44.512 305.241 41.416Z" fill="#D6C2E4" />
        <path className={`shape ${s.shape}`} d="M467.162 -128.344C464.961 -133.481 462.35 -138.745 459.288 -144.193C441.918 -175.142 410.424 -195.987 377.321 -208.788C344.217 -221.588 308.913 -227.403 274.385 -235.631C259.696 -239.131 244.922 -243.111 229.824 -242.998C198.244 -242.758 168.584 -223.945 150.396 -198.118C132.207 -172.292 124.461 -140.269 123.177 -108.698C122.034 -80.374 126.224 -50.736 142.127 -27.267C150.636 -14.706 162.079 -4.48801 173.396 5.603C191.048 21.325 208.686 37.032 226.338 52.754C235.863 61.236 245.529 69.817 256.902 75.575C294.238 94.486 350.962 79.216 380.397 52.994C387.452 46.714 394.888 40.927 402.48 35.31C417.056 24.514 432.041 13.873 443.682 -0.197998C453.602 -12.18 461.236 -25.855 466.471 -40.505C478.38 -73.853 479.706 -98.989 467.148 -128.315L467.162 -128.344Z" fill="#FF8D7C" />
        <path className={`shape ${s.shape}`} d="M169.435 -205.607C148.818 -175.99 129.93 -144.503 120.322 -109.71C110.714 -74.918 111.159 -36.205 127.924 -4.24402C151.965 41.593 203.46 65.0269 252.202 82.339C278.731 91.765 306.571 100.469 334.55 97.357C379.842 92.322 416.03 57.618 443.47 21.2C463.003 -4.72002 480.492 -33.695 484.255 -65.94C490.402 -118.637 457.735 -169.858 414.466 -200.498C339.416 -253.643 230.234 -292.948 169.435 -205.607Z" fill="#83D398" />
        <path className={`shape ${s.shape}`} d="M464.472 -3.17603C457.726 12.736 447.919 27.796 433.879 37.891C416.55 50.362 394.683 54.108 373.867 58.828C327.818 69.273 282.318 86.114 235.112 84.942C187.906 83.769 136.741 58.28 124.757 12.599C111.63 -37.436 148.725 -85.035 165.765 -133.868C171.886 -151.394 175.678 -170.183 186.337 -185.395C233.422 -252.545 313.946 -190.618 369.832 -174.508C449.244 -151.622 499.983 -86.893 464.472 -3.17603Z" fill="#FFD95D" />
        <path className={`shape ${s.shape}`} d="M385.912 -66.1493C385.749 -69.0705 385.624 -71.9596 385.576 -74.8041C384.958 -111.831 360.288 -158.176 313.197 -160.996C285.739 -162.64 255.081 -162.256 235.115 -146.215C222.627 -136.182 216.601 -121.583 213.167 -107.185C210.035 -94.0479 208.712 -80.379 211.819 -67.1911C219.942 -32.724 255.578 -8.62201 288.744 12.29C301.242 20.17 314.649 28.352 330.078 29.348C354.539 30.927 375.874 13.108 383.094 -6.881C389.86 -25.607 387.008 -46.597 385.912 -66.1493Z" fill="#88C4D2" />
      </svg>
      <div ref={heading} className={`work-heading ${s.heading}`}>
        <div className="word">
          {"Discover".split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
        <div className="word">
          {"Latest".split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
        <div className="word">
          {"Projects".split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
      </div>

      <div className={`slider ${s.slider}`}>
        <div className={s.counter}>
          <h2>0{counter}/07</h2>
        </div>
        {data.map(({ id, name }, i) => (
          <Link
            key={id}
            href={`${workPaths[id]}`}
            className={`slide-${i} ${s.slide}`}
            onClick={() => handleCardClick(id)}
          >
            <svg className={`${s.cardElements} element-${i}`} width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path id={`workPath-${i}`} className={`${s.svgElementPath}`} d="M-105 305.241C332 90.2408 1366 -215.059 1806 223.741C2246 662.541 1945 792.741 1601.5 951.595C1081 1153.24 -194.6 1136.8 -105 588C-48.1666 298.833 165.1 -242.5 563.5 -94.5" stroke="black" />
              <path className={`svgImageElement ${s.SVGimage}`} d="M-317.45 235.63C-349.035 310.822 -313.478 406.175 -239.581 445.005C-165.683 483.835 -63.4534 461.125 -14.4337 395.176C133.2 196.539 -222.194 8.84493 -317.45 235.63Z" fill="#FF9293" />
              <path className={`svgImageElement ${s.SVGimage}`} d="M-258.644 487.117C-274.95 477.061 -290.158 465.077 -305.163 453.109C-325.09 437.21 -345.708 420.072 -354.942 396.325C-373.631 348.281 -353.014 260.637 -318.787 223.214C-296.555 198.902 -250.35 182.047 -219.416 171.849C-183.167 159.897 -143.657 157.594 -106.389 166.069C-47.014 179.587 5.58801 220.253 33.574 274.296C43.342 293.172 50.303 313.991 49.99 335.232C49.582 362.943 36.882 389.119 21.078 411.896C-6.641 451.841 -45.415 484.737 -90.914 501.968C-136.413 519.199 -188.67 519.966 -233.26 500.527C-242.056 496.689 -250.476 492.146 -258.628 487.102L-258.644 487.117Z" fill="#FF82BA" />
              <path className={`svgImageElement ${s.SVGimage}`} d="M38.407 413.238C31.623 429.256 21.761 444.416 7.64099 454.578C-9.78601 467.132 -31.776 470.902 -52.71 475.654C-99.019 486.169 -144.776 503.122 -192.249 501.942C-239.722 500.761 -291.176 475.102 -303.228 429.118C-316.428 378.75 -279.124 330.835 -261.988 281.678C-255.832 264.036 -252.019 245.121 -241.299 229.808C-193.949 162.212 -112.97 224.551 -56.768 240.768C23.093 263.806 74.118 328.965 38.407 413.238Z" fill="#C19280" />
              <path className={`svgImageElement ${s.SVGimage}`} d="M-149.759 459.416C-144.344 458.954 -138.986 458.568 -133.707 458.328C-64.991 455.223 19.792 406.159 22.609 316.985C24.25 264.99 21.962 207.05 -8.84799 170.144C-28.117 147.059 -55.534 136.431 -82.444 130.692C-106.997 125.457 -132.444 123.671 -156.771 130.237C-220.35 147.395 -263.269 216.028 -300.393 279.822C-314.382 303.862 -328.885 329.637 -329.941 358.857C-331.617 405.183 -297.435 444.586 -259.95 457.19C-224.832 469 -186.007 462.512 -149.759 459.416Z" fill="#D6C2E4" />
              <path className={`svgImageElement ${s.SVGimage}`} d="M12.162 289.656C9.96099 284.519 7.34999 279.255 4.28799 273.807C-13.082 242.858 -44.576 222.013 -77.679 209.212C-110.783 196.412 -146.087 190.597 -180.615 182.369C-195.304 178.869 -210.078 174.889 -225.176 175.002C-256.756 175.242 -286.416 194.055 -304.604 219.882C-322.793 245.708 -330.539 277.731 -331.823 309.302C-332.966 337.626 -328.776 367.264 -312.873 390.733C-304.364 403.294 -292.921 413.512 -281.604 423.603C-263.952 439.325 -246.314 455.032 -228.662 470.754C-219.137 479.236 -209.471 487.817 -198.098 493.575C-160.762 512.486 -104.038 497.216 -74.603 470.994C-67.548 464.714 -60.112 458.927 -52.52 453.31C-37.944 442.514 -22.959 431.873 -11.318 417.802C-1.39799 405.82 6.23601 392.145 11.471 377.495C23.38 344.147 24.706 319.011 12.148 289.685L12.162 289.656Z" fill="#FF8D7C" />
              <path className={`svgImageElement ${s.SVGimage}`} d="M-285.565 212.393C-306.182 242.01 -325.07 273.497 -334.678 308.29C-344.286 343.082 -343.841 381.795 -327.076 413.756C-303.035 459.593 -251.54 483.027 -202.798 500.339C-176.269 509.765 -148.429 518.469 -120.45 515.357C-75.158 510.322 -38.97 475.618 -11.53 439.2C8.003 413.28 25.492 384.305 29.255 352.06C35.402 299.363 2.735 248.142 -40.534 217.502C-115.584 164.357 -224.766 125.052 -285.565 212.393Z" fill="#83D398" />
              <path className={`svgImageElement ${s.SVGimage}`} d="M9.47198 414.824C2.72599 430.736 -7.081 445.796 -21.121 455.891C-38.45 468.362 -60.317 472.108 -81.133 476.828C-127.182 487.273 -172.682 504.114 -219.888 502.942C-267.094 501.769 -318.259 476.28 -330.243 430.599C-343.37 380.564 -306.275 332.965 -289.235 284.132C-283.114 266.606 -279.322 247.817 -268.663 232.605C-221.578 165.455 -141.054 227.382 -85.168 243.492C-5.756 266.378 44.983 331.107 9.47198 414.824Z" fill="#FFD95D" />
              <defs>
                <clipPath id="clip0_7_5">
                  <rect width="1920" height="1080" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <Image
              className={`image-${i} ${s.image}`}
              src={`/work/${id}.webp`} // Ensure this path is correct
              alt="image"
              height={2000}
              width={2000}
              loading="lazy"
            />
            <div
              onPointerEnter={workHeadingPointerEnter}
              onPointerLeave={workHeadingPointerLeave}
            >
              <h2 className={`heading-${i}`}>{name}</h2>
              <h2 className={`heading-${i}`} data-stroke>
                {name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Work;
