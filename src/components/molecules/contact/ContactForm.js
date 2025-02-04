// src/components/molecules/kontak/ContactForm.js
import React from "react";
import InputField from "../../atoms/InputField";
import Button from "../../atoms/Button";

const ContactForm = () => {
  return (
    <div className="bar-2">
      <InputField type="text" placeholder="Name" className="input-field" />
      <InputField type="email" placeholder="Email" className="input-field" />
      <Button >Submit</Button>
    </div>
  );
};

export default ContactForm;
