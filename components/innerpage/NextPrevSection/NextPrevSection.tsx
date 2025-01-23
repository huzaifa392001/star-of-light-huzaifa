import React, { useEffect, useRef } from "react";
import s from "./NextPrevSection.module.scss";
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

interface NextPrevSectionProps {
  image?: string;
  heading?: string;
}

const NextPrevSection: React.FC<NextPrevSectionProps> = ({
  image,
  heading,
}) => {
  const refreshTrigger = () => {
    console.log("refreshing ScrollTrigger");
    ScrollTrigger.refresh();
  };
  return (
    <>
      <h2 className={s.fullHeading}>Thyssen Bornemisza</h2>
      <div className={`${s.nextPrevSection}`}>
        <div className={`${s.projectRow}`}>
          <div className={`${s.projectBox}`}>
            <h3 className={`${s.prevHeading}`}>previous Project</h3>
            <figure className={`${s.imgWrapper}`}>
              {/* <Image
                onLoadingComplete={() => refreshTrigger()}
                src={image || ""}
                fill
                alt=""
              /> */}
            </figure>
            <h2 className={`${s.projectHeading}`}>previous Project Name</h2>
          </div>
          <div className={`${s.projectBox}`}>
            <h3 className={`${s.prevHeading}`}>next Project</h3>
            <figure className={`${s.imgWrapper}`}>
              {/* <Image
                onLoadingComplete={() => refreshTrigger()}
                src={image || ""}
                fill
                alt=""
              /> */}
            </figure>
            <h2 className={`${s.projectHeading}`}>next Project Name</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default NextPrevSection;
