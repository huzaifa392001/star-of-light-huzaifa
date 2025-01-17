import React, { useEffect, useRef } from "react";
import s from "./HeadingSection.module.scss";
import Image from "next/image";
import Reeller from "reeller";
import gsap from "gsap";

interface HeadingSectionProps {
  image?: string;
  heading?: string;
}
// Reeller.gsap = gsap;

const HeadingSection: React.FC<HeadingSectionProps> = ({ image, heading }) => {
  const reelContainerRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (reelContainerRef.current) {
  //     const reeller = new Reeller({
  //       container: reelContainerRef.current,
  //       wrapper: ".my-reel-wrap",
  //       itemSelector: ".my-reel-item",
  //       speed: -15,
  //     });

  //     return () => {
  //       reeller.destroy(); // Ensure Reeller instance is cleaned up
  //     };
  //   }
  // }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container?.current!.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(starRef.current, {
        x: x * 0.5,
        y: y * 0.5,
        ease: "power2.out",
        duration: 0.4,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(starRef.current, {
        x: 0,
        y: 0,
        ease: "elastic.out(1.5, 0.4)",
        duration: 1.5,
      });
    };

    if (container?.current) {
      const currentContainer = container.current;
      currentContainer.addEventListener("mousemove", handleMouseMove);
      currentContainer.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        currentContainer.removeEventListener("mousemove", handleMouseMove);
        currentContainer.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div className={s.headingWrapper} ref={container}>
      <figure className={s.headingImage} ref={starRef}>
        <Image
          src={image || "/default-image.jpg"}
          width={360}
          height={538}
          alt={heading || "Default heading"}
        />
      </figure>
      <div className="my-reel" ref={reelContainerRef}>
        <div className={`my-reel-wrap ${s.myreelwrap}`}>
          <div className="my-reel-item">
            <h2 className={s.heading}>{heading}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadingSection;
