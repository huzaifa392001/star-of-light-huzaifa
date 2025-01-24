import React, { useEffect, useRef } from "react";
import s from "./SubHeading.module.scss";
import SplitType from "split-type";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface SubHeadingProps {
  subHeading?: string;
}

const SubHeading: React.FC<SubHeadingProps> = ({ subHeading }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hiddenHeadingRef = useRef<HTMLHeadingElement>(null);
  const headingContainer = useRef<HTMLDivElement>(null);

  const headingAnimation = () => {};

  useGSAP(
    () => {
      let text: SplitType | undefined;
      let hiddenText: SplitType | undefined;

      // Split text into characters
      if (headingRef.current) {
        text = new SplitType(headingRef.current, {
          types: "lines,words,chars",
          lineClass: "line",
          wordClass: "word",
          charClass: "char",
        });
      }

      // Split hidden text
      if (hiddenHeadingRef.current) {
        hiddenText = new SplitType(hiddenHeadingRef.current, {
          types: "lines,words,chars",
          lineClass: "line",
          wordClass: "word",
          charClass: "char",
        });
      }

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingContainer.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
        },
      });

      // Animation for the hidden heading text
      if (hiddenText) {
        gsap.set(hiddenText.words, {
          clipPath: "inset(0% 100% 0% 0%)",
        });
        tl.to(
          hiddenText.words,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            stagger: 0.5,
          },
          0.1
        );
      }

      // If you want to animate the visible heading, you can add another animation here.
      // For example, animating text reveal with a different effect.
    },
    { scope: headingRef }
  );

  useEffect(() => {
    headingAnimation();
  }, [subHeading]); // Run effect when subHeading changes

  return (
    <div className={s.wrapper} ref={headingContainer}>
      <h2 className={`${s.subHeading}`} ref={headingRef}>
        {subHeading}
      </h2>
      <h2
        className={`${s.subHeading} ${s.hideHeading} hiddenHeading`}
        ref={hiddenHeadingRef}
      >
        {subHeading}
      </h2>
    </div>
  );
};

export default SubHeading;
