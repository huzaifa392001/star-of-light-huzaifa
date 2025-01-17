import React from "react";
import s from "./ImageSection.module.scss";
import Image from "next/image";

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
        className={`${s.imageWrap} ${
          type === "withBg" ? s.bgImgWrap : ""
        } ${type === "doubleImg" ? s.doubleImgWrap : ""} ${type === "doubleFullImg" ? s.doubleFullImgWrap : ""} ${type === "fullImg" ? s.fullImgWrap : ""}`}
      >
        {type === "withBg" || type === "fullImg" ? (
          <Image
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
