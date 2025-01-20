import Image from "next/image";
import React, { memo } from "react";
import s from "./ContentSection.module.scss";

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
  return (
    <div className={`${s.section} ${minDescription ? s.leftImgSection : ""}`}>
      {leftImg && image && (
        <figure className={s.image}>
          <Image src={image} alt="Content Image" width={800} height={800} />
        </figure>
      )}

      <div className={`${s.content} ${leftImg ? s.leftImgContent : ""}`}>
        {/* Logo Section */}
        {logo && (
          <div className={s.logo}>
            <Image src={logo} alt="Logo" fill />
          </div>
        )}
        {/* First Description */}
        {!minDescription && description?.[0] && (
          <p
            className={`${s.description} ${minDescription ? s.minDescription : ""}`}
          >
            {description[0]}
          </p>
        )}
        {minDescription &&
          description?.map((text, index) => (
            <p
              className={`${s.description} ${minDescription ? s.minDescription : ""}`}
              key={index}
            >
              {text}
            </p>
          ))}
      </div>

      {/* Image Section */}
      {!leftImg && image && (
        <figure className={s.image}>
          <Image
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
