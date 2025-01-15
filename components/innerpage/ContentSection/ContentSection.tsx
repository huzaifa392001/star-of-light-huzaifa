import Image from "next/image";
import React from "react";
import s from "./ContentSection.module.scss";

interface SubHeadingProps {
  logo: string;
  description: string[];
  image: string;
}

const ContentSection: React.FC<SubHeadingProps> = ({
  logo,
  description,
  image,
}) => {
  return (
    <div className={s.section}>
      <div className={s.content}>
        {/* Logo Section */}
        <div className={s.logo}>
          <Image src={logo || ""} alt="Logo" width={400} height={108} />
        </div>
        {/* First Description */}
        <p className={s.description}>{description[0]}</p>
      </div>

      {/* Image Section */}
      <figure className={s.image}>
        <Image src={image || ""} alt="Content Image" width={800} height={800} />
      </figure>

      {/* Additional Descriptions */}
      <div className={s.addContent}>
        {description &&
          description.slice(1).map((text, index) => (
            <p className={s.description} key={index}>
              {text}
            </p>
          ))}
      </div>
    </div>
  );
};

export default ContentSection;
