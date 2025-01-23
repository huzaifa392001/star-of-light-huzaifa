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
      scrollTrigger: {
        trigger: videoSection?.current,
        start: "25% 90%",
        // markers: true,
        toggleActions: "play none none reverse",
      },
    });

    tl.to(videoRef?.current, {
      y: 0,
      opacity: 1,
      // scale: 1,
      ease: "power4.out",
      duration: 1,
    });
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
