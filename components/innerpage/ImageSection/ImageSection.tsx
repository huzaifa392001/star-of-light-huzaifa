import React, { useRef, useEffect } from "react";
import s from "./ImageSection.module.scss";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface ImageSectionProps {
  image?: string;
  doubleImg?: string[]; // Array of images for double image type
  type?: string;
  backgroundImage?: string; // Optional background image
}

const ImageSection: React.FC<ImageSectionProps> = ({
  image,
  type,
  backgroundImage,
  doubleImg,
}) => {
  const imgRef = useRef<HTMLElement>(null);

  const refreshTrigger = () => {
    console.log("refreshing ScrollTrigger");
    ScrollTrigger.refresh();
  };

  useGSAP(() => {
    if (imgRef.current) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: imgRef.current,
          toggleActions: "play none none reverse",
          start: "top 65%",
          // markers: true,
        },
      });

      if (type === "withBg") {
        // Animate the figure element for "withBg" type
        tl.from(imgRef.current, {
          yPercent: 20,
          autoAlpha: 0,
          scale: 1.2,
          ease: "power4.out",
          duration: 1,
        });
      } else {
        // Animate the images for other types
        const images = imgRef.current.querySelectorAll("img");
        tl.from(images, {
          yPercent: 20,
          autoAlpha: 0,
          scale: type === "doubleImg" || type === "doubleFullImg" ? 1 : 1.2,
          stagger: 0.2, // Add stagger for multiple images
          ease: "power4.out",
          duration: 1.2,
        });
      }
    }
  }, [type]); // Add "type" as a dependency

  return (
    <div
      className={`${s.imageSection} ${type === "withBg" ? s.withBg : ""} ${
        type === "fullImg" || type === "doubleImg" ? s.fullImg : ""
      } ${type === "doubleFullImg" ? s.doubleFullImg : ""}`}
      style={
        type === "withBg" && backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : {}
      }
    >
      <figure
        ref={imgRef} // Assign ref to the container
        className={`${s.imageWrap} ${
          type === "withBg" ? s.bgImgWrap : ""
        } ${type === "doubleImg" ? s.doubleImgWrap : ""} ${
          type === "doubleFullImg" ? s.doubleFullImgWrap : ""
        } ${type === "fullImg" ? s.fullImgWrap : ""}`}
      >
        {type === "withBg" || type === "fullImg" ? (
          <Image
            onLoadingComplete={() => refreshTrigger()}
            quality={100}
            src={image || ""}
            height={1080}
            width={1920}
            alt={type || "Image"}
          />
        ) : type === "doubleImg" || type === "doubleFullImg" ? (
          <>
            {doubleImg?.map((img, index) => (
              <Image
                onLoadingComplete={() => refreshTrigger()}
                key={index}
                quality={100}
                src={img}
                height={1080}
                width={1920}
                alt={`Double image ${index + 1}`}
              />
            ))}
          </>
        ) : (
          <Image
            onLoadingComplete={() => refreshTrigger()}
            quality={100}
            src={image || ""}
            height={3056}
            width={2550}
            alt={type || "Image"}
          />
        )}
      </figure>
    </div>
  );
};

export default ImageSection;
