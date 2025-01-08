import Image from "next/image";
import s from "./archive.module.scss";
import type { Data } from "./data";

type Props = Data & { id: number };

const Card: React.FC<Props> = ({
  imgVarient,
  heading,
  para,
  position,
  id,
  video,
  lessPad,
}) => {
  return (
    <div
      className={`${s.archiveCard} ${imgVarient === "full" && s.archiveFullCard}`}
    >
      <figure
        className={`${s.imgCont} ${imgVarient === "long" ? s.longImg : imgVarient}`}
      >
        {!video ? (
          <Image src={`/archive/${id}.webp`} fill alt={`${heading}`} />
        ) : (
          <iframe
            src={video}
            className={s.video}
            frameBorder={0}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
          ></iframe>
        )}
      </figure>
      <div className={s.content}>
        {heading.map((e, i) => (
          <h2 key={i}>{e}</h2>
        ))}
        <p>{para}</p>
      </div>
    </div>
  );
};

export default Card;
