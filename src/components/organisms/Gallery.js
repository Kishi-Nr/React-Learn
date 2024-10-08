// src/components/organisms/Gallery.js
import React, { useState } from "react";
import Title from "../atoms/Title";
import GalleryItem from "../molecules/gallery/GalleryItem";
import "../../styles/Gallery.css";

const Gallery = () => {

  return (
    <section id="Gallery">
      <div className="gallery">
        <Title title="Latest work" />
        <div className="gallery-content">
          {[...Array(6)].map((_, index) => (
            <GalleryItem
              key={index}
              src={`/img/gallery/Image (${index + 1}).png`}
              alt={`Gallery Item ${index + 1}`}
              title="Project title"
              description="UI, Art direction"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
