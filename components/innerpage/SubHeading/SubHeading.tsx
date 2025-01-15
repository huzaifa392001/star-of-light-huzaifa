import React from "react";
import s from "./SubHeading.module.scss";

interface SubHeadingProps {
  subHeading?: string;
}

const SubHeading: React.FC<SubHeadingProps> = ({ subHeading }) => {
  return (
    <div className={s.wrapper}>
      <h2 className={s.subHeading}>{subHeading}</h2>
    </div>
  );
};

export default SubHeading;
