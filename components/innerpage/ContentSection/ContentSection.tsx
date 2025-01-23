import Image from "next/image";
import React, { memo, useRef, useEffect } from "react";
import s from "./ContentSection.module.scss";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface SubHeadingProps {
  logo?: string;
  description?: string[];
  image?: string;
  type?: string;
  contentType?: "";
  minDescription?: boolean;
  leftImg?: boolean;
}

const ContentSection: React.FC<SubHeadingProps> = ({
  logo,
  description,
  image,
  type,
  minDescription,
  leftImg,
}) => {
  const animationContainer = useRef<HTMLDivElement>(null);
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  const refreshTrigger = () => {
    console.log("refreshing ScrollTrigger");
    ScrollTrigger.refresh();
  };

  useGSAP(
    () => {
      // Animate paragraphs line by line on component load
      paraRefs.current.forEach((para, index) => {
        if (para) {
          // Split the paragraph into lines
          const splitText = new SplitType(para, { types: "lines" });

          // Get all the lines
          const lines = splitText.lines;

          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: para,
              toggleActions: "play none none reverse",
              start: "top 80%",
            },
          });

          // Animate each line
          tl.from(
            lines,
            {
              y: "100%",
              opacity: 0,
              ease: "power4.out",
              stagger: 0.1, // Delay for each line
            },
            index * 0.2 // Delay for each paragraph
          );
        }
      });

      const imageElement = imageRef.current?.querySelector("img");

      let imgTl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      imgTl.set(imageRef.current, { autoAlpha: 1 });
      imgTl.from(imageRef.current, {
        xPercent: leftImg ? -100 : 100,
        duration: 0.75,
        ease: "power2s.out",
      });
      imgTl.from(imageElement || "", {
        xPercent: leftImg ? 100 : -100,
        scale: 2,
        duration: 0.75,
        delay: -0.75,
        ease: "power2s.out",
      });
    },
    { scope: animationContainer }
  );

  const setParaRef = (index: number) => (el: HTMLParagraphElement | null) => {
    paraRefs.current[index] = el;
  };

  return (
    <div
      ref={animationContainer}
      className={`${s.section} ${minDescription ? s.leftImgSection : ""}`}
    >
      {leftImg && image && (
        <figure className={`${s.image} ${s.leftImgWrap}`} ref={imageRef}>
          <Image
            onLoadingComplete={() => refreshTrigger()}
            src={image}
            alt="Content Image"
            width={800}
            height={800}
          />
        </figure>
      )}

      <div className={`${s.content} ${leftImg ? s.leftImgContent : ""}`}>
        {/* Logo Section */}
        {logo && (
          <div className={s.logo}>
            <Image
              onLoadingComplete={() => refreshTrigger()}
              src={logo}
              alt="Logo"
              fill
            />
          </div>
        )}

        {/* First Description */}
        {!minDescription && description?.[0] && (
          <p
            className={`${s.description} ${minDescription ? s.minDescription : ""}`}
            ref={setParaRef(0)} // Using the setParaRef function
          >
            {description[0]}
          </p>
        )}

        {minDescription &&
          description?.map((text, index) => (
            <p
              className={`${s.description} ${minDescription ? s.minDescription : ""}`}
              key={index}
              ref={setParaRef(index)} // Using the setParaRef function
            >
              {text}
            </p>
          ))}
      </div>

      {/* Image Section */}
      {!leftImg && image && (
        <figure className={s.image} ref={imageRef}>
          <Image
            onLoadingComplete={() => refreshTrigger()}
            src={image}
            alt="Content Image"
            width={minDescription ? 1200 : 800}
            height={minDescription ? 1200 : 800}
          />
        </figure>
      )}

      {/* Additional Descriptions */}
      {description && !minDescription && description.length > 1 && (
        <div className={s.addContent}>
          {description.slice(1).map((text, index) => (
            <p
              className={`${s.description} ${minDescription ? s.minDescription : ""}`}
              key={index}
              ref={setParaRef(index + 1)} // Using the setParaRef function
            >
              {text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(ContentSection);
