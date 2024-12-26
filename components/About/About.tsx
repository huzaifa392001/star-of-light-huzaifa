import Image from "next/image";
import s from "./about.module.scss";
import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
// import Elements from "./Elements";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { memo } from "react"
// import { AboutHeading } from "../Svg/Svg";

const About = () => {
  const container = useRef<HTMLDivElement>(null);
  const para = useRef<HTMLParagraphElement>(null);
  const paraHide = useRef<HTMLParagraphElement>(null);
  const heading = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isWindowWide, setIsWindowWide] = useState(false);
  const elementAnimation = useRef<SVGSVGElement>(null);
  let mm = gsap.matchMedia();

  const updateImageHeight = () => {
    const paraBox = container.current?.querySelector(".about-para-box") as HTMLDivElement;
    const img = imgRef.current;

    if (window.innerWidth > 991 && paraBox && img) {
      img.style.height = `${paraBox.offsetHeight}px`;
    } else if (img) {
      img.style.height = "auto";
    }
  };

  useEffect(() => {
    setIsWindowWide(window.innerWidth > 991);
    updateImageHeight();

    const handleResize = () => {
      setIsWindowWide(window.innerWidth > 991);
      updateImageHeight();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  useIsomorphicLayoutEffect(() => {
    SplitType.create(para.current!, {
      types: "words",
      wordClass: "about-para-word",
    });
    SplitType.create(paraHide.current!, {
      types: "words",
    });
  }, [para, paraHide]);

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
                fastScrollEnd: true,
                preventOverlaps: true,
              },
              defaults: {
                ease: "power4.inOut",
              },
            })
            .from(".about-heading path", {
              strokeDashoffset: 1120,
              duration: 0.8,
              ease: "none",
            })
            .to(".about-heading path", {
              duration: 0.8,
              fill: "black",
              ease: "power3",
            })
            .from(".about-path-2", { xPercent: 70 }, "<");

          gsap
            .timeline({
              scrollTrigger: {
                trigger: isDesktop ? "#about-grid" : ".about-para-box",
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse",
                fastScrollEnd: true,
                preventOverlaps: true,
                scrub: true,
              },
              defaults: {
                ease: "power4.inOut",
              },
            })
            .to(
              ".about-para-word",
              {
                clipPath: "inset(0% 0% 0% 0%)",
                stagger: 0.2,
              },
              "<"
            );
          gsap
            .timeline({
              scrollTrigger: {
                trigger: "#about-grid",
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse",
                fastScrollEnd: true,
                preventOverlaps: true,
              },
              defaults: {
                ease: "power4.inOut",
              },
            })
            .from(".about-img", { clipPath: "inset(100% 0% 0% 0%)" })
            .from(".about-path-1", { xPercent: -50, y: -400, scale: 0 })
            .to(
              ".about-path-3 path",
              { strokeDashoffset: 0, duration: 2 },
              "<0.2"
            )
            .from(".about-path-4", { yPercent: 100, scale: 0 }, "<0.2");
        }
      );
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
              toggleActions: "play none reverse none",
            },
          });
          tl.to('.about .shape', {
            scale: 1,
            stagger: 0.5
          }).to(".about .shape", {
            motionPath: {
              path: ".about #path",
              align: ".about #path",
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            transformOrigin: "50% 50%",
            duration: 5,
            ease: "circ.in",
            stagger: 0.5,
          }, "<")
        }
      }, 1500);
    });
  }, { scope: elementAnimation });

  return (
    <section ref={container} id="about" className={s.main}>
      <svg className={`about ${s.svgElement}`} ref={elementAnimation} width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="path" className={`${s.SVGline}`} d="M332 -113.5C44.4731 -54.1626 -28.123 604.222 345.571 336.091C719.265 67.9599 1027.65 8.34432 1487.97 56.556C1801.35 127.019 2144.38 656.698 1698.85 837.678C1253.32 1018.66 1158 1002.5 997.5 941C349.5 770.742 -147.333 1150.23 -310.5 1306.5" stroke="black" />
        <path className={`shape ${s.shape}`} d="M137.55 -182.37C105.965 -107.178 141.522 -11.8251 215.419 27.0054C289.317 65.8349 391.547 43.1254 440.566 -22.8237C588.2 -221.461 232.806 -409.155 137.55 -182.37Z" fill="#FF9293" />
        <path className={`shape ${s.shape}`} d="M196.356 69.117C180.05 59.061 164.842 47.077 149.837 35.109C129.91 19.21 109.292 2.07199 100.058 -21.675C81.3688 -69.719 101.986 -157.363 136.213 -194.786C158.445 -219.098 204.65 -235.953 235.584 -246.151C271.833 -258.103 311.343 -260.406 348.611 -251.931C407.986 -238.413 460.588 -197.747 488.574 -143.704C498.342 -124.828 505.303 -104.009 504.99 -82.768C504.582 -55.057 491.882 -28.881 476.078 -6.104C448.359 33.841 409.585 66.737 364.086 83.968C318.587 101.199 266.33 101.966 221.74 82.527C212.944 78.689 204.524 74.146 196.372 69.102L196.356 69.117Z" fill="#FF82BA" />
        <path className={`shape ${s.shape}`} d="M493.407 -4.76201C486.623 11.256 476.761 26.416 462.641 36.578C445.214 49.132 423.224 52.902 402.29 57.654C355.981 68.169 310.224 85.122 262.751 83.942C215.278 82.761 163.824 57.102 151.772 11.118C138.572 -39.25 175.876 -87.165 193.012 -136.322C199.168 -153.964 202.981 -172.879 213.701 -188.192C261.051 -255.788 342.03 -193.449 398.232 -177.232C478.093 -154.194 529.118 -89.035 493.407 -4.76201Z" fill="#C19280" />
        <path className={`shape ${s.shape}`} d="M305.241 41.416C310.656 40.954 316.014 40.568 321.293 40.328C390.009 37.223 474.792 -11.841 477.609 -101.015C479.25 -153.01 476.962 -210.95 446.152 -247.856C426.883 -270.941 399.466 -281.569 372.556 -287.308C348.003 -292.543 322.556 -294.329 298.229 -287.763C234.65 -270.605 191.731 -201.972 154.607 -138.178C140.618 -114.138 126.115 -88.363 125.059 -59.143C123.383 -12.817 157.565 26.586 195.05 39.19C230.168 51 268.993 44.512 305.241 41.416Z" fill="#D6C2E4" />
        <path className={`shape ${s.shape}`} d="M467.162 -128.344C464.961 -133.481 462.35 -138.745 459.288 -144.193C441.918 -175.142 410.424 -195.987 377.321 -208.788C344.217 -221.588 308.913 -227.403 274.385 -235.631C259.696 -239.131 244.922 -243.111 229.824 -242.998C198.244 -242.758 168.584 -223.945 150.396 -198.118C132.207 -172.292 124.461 -140.269 123.177 -108.698C122.034 -80.374 126.224 -50.736 142.127 -27.267C150.636 -14.706 162.079 -4.48801 173.396 5.603C191.048 21.325 208.686 37.032 226.338 52.754C235.863 61.236 245.529 69.817 256.902 75.575C294.238 94.486 350.962 79.216 380.397 52.994C387.452 46.714 394.888 40.927 402.48 35.31C417.056 24.514 432.041 13.873 443.682 -0.197998C453.602 -12.18 461.236 -25.855 466.471 -40.505C478.38 -73.853 479.706 -98.989 467.148 -128.315L467.162 -128.344Z" fill="#FF8D7C" />
        <path className={`shape ${s.shape}`} d="M169.435 -205.607C148.818 -175.99 129.93 -144.503 120.322 -109.71C110.714 -74.918 111.159 -36.205 127.924 -4.24402C151.965 41.593 203.46 65.0269 252.202 82.339C278.731 91.765 306.571 100.469 334.55 97.357C379.842 92.322 416.03 57.618 443.47 21.2C463.003 -4.72002 480.492 -33.695 484.255 -65.94C490.402 -118.637 457.735 -169.858 414.466 -200.498C339.416 -253.643 230.234 -292.948 169.435 -205.607Z" fill="#83D398" />
        <path className={`shape ${s.shape}`} d="M464.472 -3.17603C457.726 12.736 447.919 27.796 433.879 37.891C416.55 50.362 394.683 54.108 373.867 58.828C327.818 69.273 282.318 86.114 235.112 84.942C187.906 83.769 136.741 58.28 124.757 12.599C111.63 -37.436 148.725 -85.035 165.765 -133.868C171.886 -151.394 175.678 -170.183 186.337 -185.395C233.422 -252.545 313.946 -190.618 369.832 -174.508C449.244 -151.622 499.983 -86.893 464.472 -3.17603Z" fill="#FFD95D" />
        <path className={`shape ${s.shape}`} d="M385.912 -66.1493C385.749 -69.0705 385.624 -71.9596 385.576 -74.8041C384.958 -111.831 360.288 -158.176 313.197 -160.996C285.739 -162.64 255.081 -162.256 235.115 -146.215C222.627 -136.182 216.601 -121.583 213.167 -107.185C210.035 -94.0479 208.712 -80.379 211.819 -67.1911C219.942 -32.724 255.578 -8.62201 288.744 12.29C301.242 20.17 314.649 28.352 330.078 29.348C354.539 30.927 375.874 13.108 383.094 -6.881C389.86 -25.607 387.008 -46.597 385.912 -66.1493Z" fill="#88C4D2" />
        <path className={`shape ${s.shape}`} d="M260.19 -171.974C277.3 -172.762 288.769 -155.208 296.54 -139.944C335.536 -63.3484 375.669 19.4566 363.853 104.593C271.349 119.697 176.516 120.449 83.7831 106.816C53.324 102.338 152.766 -18.3894 159.731 -29.5694C181.319 -64.2224 212.638 -169.775 260.19 -171.974Z" fill="#C19280" />
        <path className={`shape ${s.shape}`} d="M170.283 -128.537C193.075 -163.931 217.062 -199.134 248.248 -227.413C279.433 -255.692 318.809 -276.797 360.856 -278.867C388.905 -280.248 420.074 -270.942 434.106 -246.616C442.609 -231.876 443.513 -214.064 443.361 -197.047C442.7 -122.965 425.385 -47.9493 385.795 14.6707C339.988 87.1237 213.772 185.333 120.288 142.708C16.1984 95.2447 132.317 -69.5793 170.283 -128.537Z" fill="#FFD95D" />
        <path className={`shape ${s.shape}`} d="M174.164 -133.874C164.432 -133.514 153.772 -134.56 144.828 -131.747C138.156 -129.648 132.93 -126.62 127.256 -123.598C123.069 -121.368 120.006 -120.017 117.59 -116.562C114.972 -112.819 112.609 -108.235 110.693 -104.302C108.031 -98.8369 109.504 -93.2362 110.198 -87.5617C110.6 -84.2752 109.568 -81.4281 112.352 -78.4579C113.224 -77.5276 114.866 -76.8412 115.803 -75.9176C116.79 -74.9444 117.042 -73.4679 118.141 -72.5828C120.499 -70.6836 125.832 -70.942 127.739 -69.0788C129.627 -67.2329 128.283 -63.8419 128.13 -61.6393C127.379 -50.826 124.069 -38.977 131.245 -28.726C134.25 -24.4337 134.744 -19.1983 135.761 -14.5971C136.396 -11.7182 138.199 -9.24178 139.945 -6.57555C141.278 -4.53713 142.636 -2.52118 143.156 -0.318408C143.946 3.03125 142.508 2.88433 141.543 5.12002C139.168 10.6177 134.733 16.1707 133.109 21.9677C131.355 28.2248 130.548 34.2966 130.113 40.8298C129.629 48.1054 128.809 54.8715 135.199 61.4793C138.986 65.3943 144.259 68.5602 148.022 72.5655C151.797 76.5831 155.344 78.9127 160.963 81.8444C167.194 85.0951 174.212 87.4958 181.149 89.9844C188.721 92.7005 196.926 94.0055 204.221 97.0592C212.665 100.594 221.002 102.714 230.291 104.94C239.986 107.264 246.243 108.978 256.235 108.3C270.325 107.344 284.706 105.391 296.919 100.632C303 98.262 308.451 95.1828 312.654 91.3538C317.093 87.3087 318.441 82.6286 321.796 78.2643C322.568 77.2601 322.891 76.2751 322.902 75.3417C322.994 75.075 323.083 74.8063 323.172 74.5371C325.444 71.3576 327.297 67.8965 329.026 64.1355C332.895 55.7137 337.211 47.682 337.781 38.7301C338.558 26.52 338.826 14.9462 331.219 3.29267C325.771 -5.05424 322.989 -12.8831 319.886 -21.6998C315.758 -33.4305 308.11 -46.0346 307.146 -58.1288C306.947 -60.6253 307.522 -62.8018 305.886 -65.1761C302.296 -70.3924 295.908 -75.2236 291.089 -80.0073C279.845 -91.169 269.209 -101.931 252.127 -109.283C244.305 -112.651 236.516 -115.784 229.204 -119.728C222.776 -123.196 216.704 -127.914 209.249 -130.305C197.977 -133.921 186.051 -134.314 174.164 -133.874Z" fill="#FFB54E" />
        <path className={`shape ${s.shape}`} d="M125.762 40.082C159.233 97.9178 246.054 119.727 295.725 75.5211C333.731 41.6979 340.634 -14.7754 345 -65.9201C319.872 -72.7827 295.563 -53.3782 277.923 -33.9425C260.283 -14.5068 241.23 8.02681 215.269 9.81422C196.804 -17.6911 216.789 -55.1635 240.621 -78.0132C264.455 -100.863 294.514 -122.215 300.082 -155.028C300.973 -160.279 301.087 -166.005 298.396 -170.579C293.299 -179.24 281.268 -179.69 271.402 -178.54C164.6 -166.081 56.7502 -79.1652 125.762 40.082Z" fill="#ADDBD0" />
      </svg>
      <div ref={heading} className={`about-heading ${s.heading}`}>
        <div className="word">
          {"Learn".split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
        <div className="word">
          {"More About".split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
        <div className="word">
          {"Me".split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </div>
      </div>
      <div id="about-grid" className={s.grid}>
        <Image
          ref={imgRef}
          className={`about-img ${s.image}`}
          src="/owner.png"
          height={1000}
          width={1000}
          alt="owner"
          loading="lazy"
        />
        <div className={`about-para-box ${s.box}`}>
          <p ref={para} className={s.content}>
            {`Hello! I'm Philippe, a passionate digital designer with a focus on
            aesthetics and innovation. I'm also dedicated to using design and
            technology for positive social change. Outside of work, I enjoy
            spending time with my two kids, as well as indulging in design,
            interior decor, travel, culture, and art, all of which inspire my
            creative process.`}
          </p>
          <p ref={paraHide} data-hide className={s.content}>
            {`Hello! I'm Philippe, a passionate digital designer with a focus on
            aesthetics and innovation. I'm also dedicated to using design and
            technology for positive social change. Outside of work, I enjoy
            spending time with my two kids, as well as indulging in design,
            interior decor, travel, culture, and art, all of which inspire my
            creative process.`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
