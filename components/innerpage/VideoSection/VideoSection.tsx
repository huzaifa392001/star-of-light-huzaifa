import React, { useRef, useEffect } from "react";
import s from "./VideoSection.module.scss";
import gsap from "gsap";

interface VideoSectionProps {
  video?: string;
  poster?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ video, poster }) => {
  const videoRef = useRef<HTMLElement>(null);
  const videoSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: videoSection?.current,
      top: "top bottom",
      markers: true,
    });

    // tl.from(videoRef?.current, {
    //   yPercent: 20,
    //   autoAlpha: 0,
    //   scale: 1.2,
    //   ease: "power2.out",
    //   duration: 1,
    // });
  }, []);

  return (
    <div ref={videoSection} className={s.videoSection}>
      <figure ref={videoRef} className={s.videoWrap}>
        <video width="100%" poster={poster} controls>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </figure>
    </div>
  );
};

export default VideoSection;
