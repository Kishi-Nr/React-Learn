import React from 'react';
import TestiBodyText from './TestiBodyTeks';
import Image from "../../atoms/Image";
import Star from "../../atoms/Image"


const TestimoniFooter = ({ avatarSrc, avatarAlt, nama, company }) => {
  return (
    <div className="testimoni-footer">
      <Image src={avatarSrc} alt={avatarAlt} />
      <div className="testimoni-detile">
        <div className="testimoni-start">
          <Star src="/img/testimoni/Star.png" alt="Star" />
          <Star src="/img/testimoni/Star.png" alt="Star" />
          <Star src="/img/testimoni/Star.png" alt="Star" />
          <Star src="/img/testimoni/Star.png" alt="Star" />
          <Star src="/img/testimoni/Star.png" alt="Star" />
        </div>
        <TestiBodyText nama={nama} company={company} />
      </div>
    </div>
  );
};

export default TestimoniFooter;
