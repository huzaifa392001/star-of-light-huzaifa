import React from "react";
import s from "./MobileSection.module.scss";
import Image from "next/image";

interface MobileSectionWraps {
  images?: string[];
}

const MobileSection: React.FC<MobileSectionWraps> = ({ images }) => {
  return (
    <div
      className={`${images?.length === 3 ? s.threeImages : s.twoImages} ${s.mobileWrap}`}
    >
      {images?.map((img, index) => (
        <figure key={index} className={s.imgWrap}>
          <Image src={img || ""} height={1020} width={740} alt="" />
        </figure>
      ))}
    </div>
  );
};

export default MobileSection;
