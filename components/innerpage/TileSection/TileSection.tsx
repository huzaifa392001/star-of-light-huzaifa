import React, { useRef, useEffect } from "react";
import s from "./TileSection.module.scss";
import gsap from "gsap";

interface TileSectionProps {
  images?: string[];
}

const TileSection: React.FC<TileSectionProps> = ({ images = [] }) => {
  const tileSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tileSection.current) {
      const rows = tileSection.current.querySelectorAll(`.${s.tileRow}`);
      rows.forEach((row, index) => {
        let imgs = row.querySelectorAll("img");
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: tileSection.current,
            start: "top bottom",
            end: "+=3500",
            scrub: true,
          },
        });

        tl.to(imgs, { y: index % 2 === 0 ? "-50%" : "50%" });
      });
    }
  }, [images]);

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < images.length; i += 2) {
      rows.push(
        <div className={s.tileRow} key={i}>
          <img src={images[i]} alt={`Tile ${i}`} className={s.tileImage} />
          {images[i + 1] && (
            <img
              src={images[i + 1]}
              alt={`Tile ${i + 1}`}
              className={s.tileImage}
            />
          )}
        </div>
      );
    }
    return rows;
  };

  return (
    <div ref={tileSection} className={s.tileSection}>
      <div className={s.tileRows}>{renderRows()}</div>
    </div>
  );
};

export default TileSection;
