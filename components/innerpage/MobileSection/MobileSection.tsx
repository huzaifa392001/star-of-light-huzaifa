import React, { useRef, useEffect } from "react";
import s from "./MobileSection.module.scss";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface MobileSectionWraps {
  images?: string[];
}

const MobileSection: React.FC<MobileSectionWraps> = ({ images }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const refreshTrigger = () => {
    console.log("refreshing ScrollTrigger");
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    if (sectionRef.current) {
      const images = sectionRef.current.querySelectorAll("figure");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        },
      });

      if (images.length === 3) {
        // Animate middle image first
        tl.to(images[1], {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power4.out",
          duration: 1,
        }).to(
          [images[0], images[2]],
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power4.out",
            duration: 1,
            // stagger: 0.2,
          },
          "-=0.75" // Overlap with the middle image animation
        );
      } else {
        // Normal animation for two images
        tl.to(images, {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power4.out",
          duration: 1,
          stagger: 0.2,
        });
      }
    }
  }, [images]);

  return (
    <div
      ref={sectionRef}
      className={`${images?.length === 3 ? s.threeImages : s.twoImages} ${
        s.mobileWrap
      }`}
    >
      {images?.map((img, index) => (
        <figure key={index} className={s.imgWrap}>
          <Image
            onLoadingComplete={() => refreshTrigger()}
            src={img || ""}
            height={1020}
            width={740}
            alt=""
          />
        </figure>
      ))}
    </div>
  );
};

export default MobileSection;
