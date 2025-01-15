import React from "react";
import s from "./VideoSection.module.scss";

interface VideoSectionProps {
  video: string;
  poster: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ video, poster }) => {
  return (
    <div className={s.videoSection}>
      <figure className={s.videoWrap}>
        <video width="100%" poster={poster}>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </figure>
    </div>
  );
};

export default VideoSection;
