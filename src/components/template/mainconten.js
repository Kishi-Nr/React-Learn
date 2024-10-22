import React from "react";
import Navbar from "../organisms/Navbar";
import Header from "../organisms/Header";
import Logo from "../organisms/Logo";
import Skills from "../organisms/Skills";
import Gallery from "../organisms/Gallery";
import Testimoni from "../organisms/Testimoni";
import Contact from "../organisms/Contact";

const MainConten = () => {

  return (
    <div>
      <Navbar />
      <Header />
      <Logo />
      <Skills />
      <Gallery />
      <Testimoni />
      <Contact />
    </div>
  );
};

export default MainConten;
