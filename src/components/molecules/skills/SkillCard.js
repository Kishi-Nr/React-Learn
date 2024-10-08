import React from "react";
import Image from "../../atoms/Image";
import SkillTitle from "../../atoms/Title";
import Lable from "../../atoms/Lable";

const SkillCard = ({ src, alt, title, description }) => {
  return (
    <div className="skill-card">
      <Image src={src} alt={alt} />
      <SkillTitle title={title} />
      <Lable>{description}</Lable>
    </div>
  );
};

export default SkillCard;
