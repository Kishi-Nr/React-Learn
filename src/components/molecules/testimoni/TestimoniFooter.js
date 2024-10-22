import React from 'react';
import Label from "../../atoms/Label"; // Import Label component
import Image from "../../atoms/Image";
import Star from "../../atoms/Image";

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
        {/* Replace TestiBodyText with Label */}
        <Label className="testimoni-nama">{nama}</Label>
        <Label className="testimoni-company">{company}</Label>
      </div>
    </div>
  );
};

export default TestimoniFooter;
