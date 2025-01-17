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
  6: "/work/thyssen",
};

const Work = () => {
  const container = useRef<HTMLElement>(null);
  const heading = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState<number>(1);
  // const [loading, setLoading] = useState(false);
  const router = useRouter();
  const elementImages = [
    "1.svg",
    "2.svg",
    "3.svg",
    "4.svg",
    "5.svg",
    "6.svg",
    "7.svg",
    "8.svg",
  ];
  const mm = gsap.matchMedia(); // GSAP MatchMedia Instance
  const elementAnimation = useRef<SVGSVGElement>(null);
  const [svgPath, setSvgPath] = useState<string>(
    "M-105 305.241C332 90.241 1366 -215.059 1806 223.741C2246 662.541 1945 792.74 1601.5 951.594C1081 1153.24 -194.6 1136.8 -105 588C-48.1666 298.833 333 -602 1339.5 -521.5"
  );
  useGSAP(
    () => {
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
            tl.to(".workSvg .shape", {
              scale: 0.8,
              motionPath: {
                path: ".workSvg #path",
                align: ".workSvg #path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
              },
              transformOrigin: "50% 50%",
              ease: "none",
              stagger: 0.05,
            });
          }
        }, 1500);
      });
    },
    { scope: elementAnimation }
  );

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
          if (!isDesktop) {
            setSvgPath(
              "M-105 305.241C332 90.241 1366 -215.059 1806 223.741C2246 662.541 1945 792.74 1601.5 951.594C1081 1153.24 -194.6 1136.8 -105 588C-48.1666 298.833 333 -602 1339.5 -521.5C2533.83 -397.667 4696.8 61.9 3794 909.5"
            );
          }
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
              end: "+=12000",
              scrub: 2.5, // Slower scrub rate for smoother scrolling effect
              pin: true,
              pinSpacing: true,
            },
            defaults: { ease: "none" }, // Use slower easing
          });

          data.forEach((_, i) => {
            tl.call(() => setCounter(i + 1))
              .to(`.slide-${i - 1}`, { yPercent: -100 })
              .from(
                `.slide-${i}`,
                { yPercent: i === 0 ? 0 : 100, duration: 2 },
                "<"
              )
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
              .to(
                `.element-${i} .svgImageElement`,
                {
                  motionPath: {
                    path: `.element-${i} #workPath-${i}`,
                    align: `.element-${i} #workPath-${i}`,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true,
                  },
                  transformOrigin: "50% 50%",
                  scale: 1,
                  duration: 10,
                  ease: "none",
                  stagger: 0.5,
                },
                "<"
              ) // Image starts moving immediately
              .to(
                `.heading-${i}`,
                {
                  scale: 1.1,
                  duration: 5.5, // Slow down to match image movement
                  ease: "none",
                },
                "<"
              ) // Heading scaling happens simultaneously
              .to(
                `.element-${i} .svgImageElement`,
                {
                  scale: 0,
                  stagger: 0.5,
                },
                "<"
              ) // Image starts moving immediately
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

  const { workHeadingPointerEnter, workHeadingPointerLeave } =
    useSnapshot(store);

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
      <svg
        className={`workSvg ${s.svgElement}`}
        ref={elementAnimation}
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="path"
          className={`${s.SVGline}`}
          d="M332 -113.5C44.4731 -54.1626 -28.123 604.222 345.571 336.091C719.265 67.9599 1027.65 8.34432 1487.97 56.556C1801.35 127.019 2144.38 656.698 1698.85 837.678C1253.32 1018.66 1242.5 978 946 942C65.4323 835.085 -238 717.5 -352 567.5"
          stroke="black"
        />
        <path
          className={`shape ${s.shape}`}
          d="M137.55 -182.37C105.965 -107.178 141.522 -11.8251 215.419 27.0054C289.317 65.8349 391.547 43.1254 440.566 -22.8237C588.2 -221.461 232.806 -409.155 137.55 -182.37Z"
          fill="#FF9293"
        />
        <path
          className={`shape ${s.shape}`}
          d="M196.356 69.117C180.05 59.061 164.842 47.077 149.837 35.109C129.91 19.21 109.292 2.07199 100.058 -21.675C81.3688 -69.719 101.986 -157.363 136.213 -194.786C158.445 -219.098 204.65 -235.953 235.584 -246.151C271.833 -258.103 311.343 -260.406 348.611 -251.931C407.986 -238.413 460.588 -197.747 488.574 -143.704C498.342 -124.828 505.303 -104.009 504.99 -82.768C504.582 -55.057 491.882 -28.881 476.078 -6.104C448.359 33.841 409.585 66.737 364.086 83.968C318.587 101.199 266.33 101.966 221.74 82.527C212.944 78.689 204.524 74.146 196.372 69.102L196.356 69.117Z"
          fill="#FF82BA"
        />
        <path
          className={`shape ${s.shape}`}
          d="M493.407 -4.76201C486.623 11.256 476.761 26.416 462.641 36.578C445.214 49.132 423.224 52.902 402.29 57.654C355.981 68.169 310.224 85.122 262.751 83.942C215.278 82.761 163.824 57.102 151.772 11.118C138.572 -39.25 175.876 -87.165 193.012 -136.322C199.168 -153.964 202.981 -172.879 213.701 -188.192C261.051 -255.788 342.03 -193.449 398.232 -177.232C478.093 -154.194 529.118 -89.035 493.407 -4.76201Z"
          fill="#C19280"
        />
        <path
          className={`shape ${s.shape}`}
          d="M305.241 41.416C310.656 40.954 316.014 40.568 321.293 40.328C390.009 37.223 474.792 -11.841 477.609 -101.015C479.25 -153.01 476.962 -210.95 446.152 -247.856C426.883 -270.941 399.466 -281.569 372.556 -287.308C348.003 -292.543 322.556 -294.329 298.229 -287.763C234.65 -270.605 191.731 -201.972 154.607 -138.178C140.618 -114.138 126.115 -88.363 125.059 -59.143C123.383 -12.817 157.565 26.586 195.05 39.19C230.168 51 268.993 44.512 305.241 41.416Z"
          fill="#D6C2E4"
        />
        <path
          className={`shape ${s.shape}`}
          d="M467.162 -128.344C464.961 -133.481 462.35 -138.745 459.288 -144.193C441.918 -175.142 410.424 -195.987 377.321 -208.788C344.217 -221.588 308.913 -227.403 274.385 -235.631C259.696 -239.131 244.922 -243.111 229.824 -242.998C198.244 -242.758 168.584 -223.945 150.396 -198.118C132.207 -172.292 124.461 -140.269 123.177 -108.698C122.034 -80.374 126.224 -50.736 142.127 -27.267C150.636 -14.706 162.079 -4.48801 173.396 5.603C191.048 21.325 208.686 37.032 226.338 52.754C235.863 61.236 245.529 69.817 256.902 75.575C294.238 94.486 350.962 79.216 380.397 52.994C387.452 46.714 394.888 40.927 402.48 35.31C417.056 24.514 432.041 13.873 443.682 -0.197998C453.602 -12.18 461.236 -25.855 466.471 -40.505C478.38 -73.853 479.706 -98.989 467.148 -128.315L467.162 -128.344Z"
          fill="#FF8D7C"
        />
        <path
          className={`shape ${s.shape}`}
          d="M169.435 -205.607C148.818 -175.99 129.93 -144.503 120.322 -109.71C110.714 -74.918 111.159 -36.205 127.924 -4.24402C151.965 41.593 203.46 65.0269 252.202 82.339C278.731 91.765 306.571 100.469 334.55 97.357C379.842 92.322 416.03 57.618 443.47 21.2C463.003 -4.72002 480.492 -33.695 484.255 -65.94C490.402 -118.637 457.735 -169.858 414.466 -200.498C339.416 -253.643 230.234 -292.948 169.435 -205.607Z"
          fill="#83D398"
        />
        <path
          className={`shape ${s.shape}`}
          d="M464.472 -3.17603C457.726 12.736 447.919 27.796 433.879 37.891C416.55 50.362 394.683 54.108 373.867 58.828C327.818 69.273 282.318 86.114 235.112 84.942C187.906 83.769 136.741 58.28 124.757 12.599C111.63 -37.436 148.725 -85.035 165.765 -133.868C171.886 -151.394 175.678 -170.183 186.337 -185.395C233.422 -252.545 313.946 -190.618 369.832 -174.508C449.244 -151.622 499.983 -86.893 464.472 -3.17603Z"
          fill="#FFD95D"
        />
        <path
          className={`shape ${s.shape}`}
          d="M385.912 -66.1493C385.749 -69.0705 385.624 -71.9596 385.576 -74.8041C384.958 -111.831 360.288 -158.176 313.197 -160.996C285.739 -162.64 255.081 -162.256 235.115 -146.215C222.627 -136.182 216.601 -121.583 213.167 -107.185C210.035 -94.0479 208.712 -80.379 211.819 -67.1911C219.942 -32.724 255.578 -8.62201 288.744 12.29C301.242 20.17 314.649 28.352 330.078 29.348C354.539 30.927 375.874 13.108 383.094 -6.881C389.86 -25.607 387.008 -46.597 385.912 -66.1493Z"
          fill="#88C4D2"
        />
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
            <svg
              className={`${s.cardElements} element-${i}`}
              width="1920"
              height="1080"
              viewBox="0 0 1920 1080"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id={`workPath-${i}`}
                className={`${s.svgElementPath}`}
                d={svgPath}
                stroke="black"
              />
              <path
                className={`svgImageElement ${s.SVGimage}`}
                d="M-191.45 202.63C-223.035 277.822 -187.478 373.175 -113.581 412.005C-39.6834 450.835 62.5466 428.125 111.566 362.176C259.2 163.539 -96.1943 -24.1551 -191.45 202.63Z"
                fill="#FF9293"
              />
              <path
                className={`svgImageElement ${s.SVGimage}`}
                d="M-99.0043 142.099C-74.9143 140.689 -48.7963 154.397 -42.2283 177.617C-35.8703 200.096 -47.9323 226.93 -34.8073 246.255C-25.9483 259.298 -8.94833 263.47 6.49567 266.644C35.6147 272.628 64.7336 278.613 93.8527 284.597C109.092 287.729 125.074 291.219 136.777 301.469C163.619 324.982 153.912 369.032 136.508 400.184C118.239 432.885 93.8737 462.167 65.0387 486.076C40.5276 506.4 6.30966 523.293 -22.0923 508.9C-60.9833 489.192 -58.7383 427.209 -95.5163 403.798C-146.868 371.108 -267.252 414.335 -258.552 306.871C-253.92 249.656 -155.857 145.43 -99.0043 142.099Z"
                fill="#83D398"
              />
              <path
                className={`svgImageElement ${s.SVGimage}`}
                d="M-158.644 454.117C-174.95 444.061 -190.158 432.077 -205.163 420.109C-225.09 404.21 -245.708 387.072 -254.942 363.325C-273.631 315.281 -253.014 227.637 -218.787 190.214C-196.555 165.902 -150.35 149.047 -119.416 138.849C-83.167 126.897 -43.657 124.594 -6.38902 133.069C52.986 146.587 105.588 187.253 133.574 241.296C143.342 260.172 150.303 280.991 149.99 302.232C149.582 329.943 136.882 356.119 121.078 378.896C93.359 418.841 54.585 451.737 9.086 468.968C-36.413 486.199 -88.67 486.966 -133.26 467.527C-142.056 463.689 -150.476 459.146 -158.628 454.102L-158.644 454.117Z"
                fill="#FF82BA"
              />
              <path
                className={`svgImageElement ${s.SVGimage}`}
                d="M138.407 380.238C131.623 396.256 121.761 411.416 107.641 421.578C90.214 434.132 68.224 437.902 47.29 442.654C0.98101 453.169 -44.776 470.122 -92.249 468.942C-139.722 467.761 -191.176 442.102 -203.228 396.118C-216.428 345.75 -179.124 297.835 -161.988 248.678C-155.832 231.036 -152.019 212.121 -141.299 196.808C-93.949 129.212 -12.97 191.551 43.232 207.768C123.093 230.806 174.118 295.965 138.407 380.238Z"
                fill="#C19280"
              />
              <path
                className={`svgImageElement ${s.SVGimage}`}
                d="M-49.759 426.416C-44.344 425.954 -38.986 425.568 -33.707 425.328C35.009 422.223 119.792 373.159 122.609 283.985C124.25 231.99 121.962 174.05 91.152 137.144C71.883 114.059 44.466 103.431 17.556 97.6921C-6.997 92.4575 -32.444 90.6713 -56.771 97.2368C-120.35 114.395 -163.269 183.028 -200.393 246.822C-214.382 270.862 -228.885 296.637 -229.941 325.857C-231.617 372.183 -197.435 411.586 -159.95 424.19C-124.832 436 -86.007 429.512 -49.759 426.416Z"
                fill="#D6C2E4"
              />
              <path
                className={`svgImageElement ${s.SVGimage}`}
                d="M112.162 256.656C109.961 251.519 107.35 246.255 104.288 240.807C86.918 209.858 55.424 189.013 22.321 176.212C-10.783 163.412 -46.087 157.597 -80.615 149.369C-95.304 145.869 -110.078 141.889 -125.176 142.002C-156.756 142.242 -186.416 161.055 -204.604 186.882C-222.793 212.708 -230.539 244.731 -231.823 276.302C-232.966 304.626 -228.776 334.264 -212.873 357.733C-204.364 370.294 -192.921 380.512 -181.604 390.603C-163.952 406.325 -146.314 422.032 -128.662 437.754C-119.137 446.236 -109.471 454.817 -98.098 460.575C-60.762 479.486 -4.038 464.216 25.397 437.994C32.452 431.714 39.888 425.927 47.48 420.31C62.056 409.514 77.041 398.873 88.682 384.802C98.602 372.82 106.236 359.145 111.471 344.495C123.38 311.147 124.706 286.011 112.148 256.685L112.162 256.656Z"
                fill="#FF8D7C"
              />
              <path
                className={`svgImageElement ${s.SVGimage}`}
                d="M-185.565 179.393C-206.182 209.01 -225.07 240.497 -234.678 275.29C-244.286 310.082 -243.841 348.795 -227.076 380.756C-203.035 426.593 -151.54 450.027 -102.798 467.339C-76.269 476.765 -48.429 485.469 -20.45 482.357C24.842 477.322 61.03 442.618 88.47 406.2C108.003 380.28 125.492 351.305 129.255 319.06C135.402 266.363 102.735 215.142 59.466 184.502C-15.584 131.357 -124.766 92.0524 -185.565 179.393Z"
                fill="#83D398"
              />
              <path
                className={`svgImageElement ${s.SVGimage}`}
                d="M109.472 381.824C102.726 397.736 92.919 412.796 78.879 422.891C61.55 435.362 39.683 439.108 18.867 443.828C-27.182 454.273 -72.682 471.114 -119.888 469.942C-167.094 468.769 -218.259 443.28 -230.243 397.599C-243.37 347.564 -206.275 299.965 -189.235 251.132C-183.114 233.606 -179.322 214.817 -168.663 199.605C-121.578 132.455 -41.054 194.382 14.832 210.492C94.244 233.378 144.983 298.107 109.472 381.824Z"
                fill="#FFD95D"
              />
              <path
                className={`svgImageElement ${s.SVGimage}`}
                d="M30.912 318.851C30.749 315.93 30.624 313.04 30.576 310.196C29.958 273.17 5.28799 226.824 -41.803 224.004C-69.2606 222.36 -99.9186 222.744 -119.885 238.785C-132.373 248.818 -138.399 263.417 -141.833 277.815C-144.965 290.952 -146.288 304.621 -143.181 317.809C-135.058 352.276 -99.4215 376.378 -66.2564 397.29C-53.7581 405.17 -40.351 413.352 -24.922 414.348C-0.461004 415.927 20.874 398.108 28.094 378.119C34.86 359.393 32.008 338.403 30.912 318.851Z"
                fill="#88C4D2"
              />
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
