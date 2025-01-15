import React from "react";
import s from "./InnerHero.module.scss";

interface InnerHeroProps {
  heading?: string[];
}

const InnerHero: React.FC<InnerHeroProps> = ({ heading }) => {
  return (
    <div className={s.hero}>
      {heading && heading.length > 0 ? (
        heading.map((text, index) => (
          <h1 className={s.heading} key={index}>
            {text}
          </h1>
        ))
      ) : (
        <h1>No Headings Provided</h1>
      )}
    </div>
  );
};

export default InnerHero;
