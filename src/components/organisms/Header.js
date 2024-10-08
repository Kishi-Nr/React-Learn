import React from "react";
import BrandingSection from "../molecules/header/BrandingSection";
import BodyTextH from "../molecules/header/BodyTextH";
import ButonContact from "../molecules/header/ButonContact";
import Image from "../atoms/Image";
import "../../styles/Header.css"; 

const HeaderContent = () => {
  return (
    <div className="layout">
      <div className="text-section">
        <BrandingSection />
        <BodyTextH/>
        <ButonContact />
      </div>
      <div className="image-section">
        <Image src="/img/header/Header.png" alt="Visual" />
      </div>
    </div>
  );
};

export default HeaderContent;
