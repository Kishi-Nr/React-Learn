// src/Components/organisms/kontak/Kontak.js
import React from 'react';
import Lable from '../atoms/Lable';
import SosMed from '../molecules/contact/SosMed';
import ContactForm from '../molecules/contact/ContactForm';
import '../../styles/Contact.css';
import '../../styles/Header.css';



const Contact = () => {
  return (
    <section id="contact">
      <div className="contact-layout">
        <h2 className="title-conatct">Let's work together</h2>
        <div className="bar-container">
          <div className="bar-1">
            <Lable className="contact-left">
            This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com
             This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com
            </Lable>
            <SosMed />
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
