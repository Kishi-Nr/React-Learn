import React from 'react';
import TestimoniTitle from '../atoms/Title';
import Label from '../atoms/Label'; // Import Label component
import TestimoniFooter from '../molecules/testimoni/TestimoniFooter'; 
import  '../../styles/Testimoni.css'; 

const TestimoniOrganism = () => {
  return (
    <section id="Testimoni">
      <div className="testimoni">
        <TestimoniTitle title="Testimonial" />
        <div className="testimoni-content">
          <div className="testimoni-item">
            {/* Replace TestimoniText with Label */}
            <Label className="testimoni-text">
              This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com
            </Label>
            <TestimoniFooter avatarSrc="/img/testimoni/Client Image.png" avatarAlt="Avatar 1" nama="Gemma Nolen" company="Google" />
          </div>

          <div className="testimoni-item">
            <Label className="testimoni-text">
              This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com
            </Label>
            <TestimoniFooter avatarSrc="/img/testimoni/Client Image.png" avatarAlt="Avatar 1" nama="Gemma Nolen" company="Google" />
          </div>

          <div className="testimoni-item">
            <Label className="testimoni-text">
              This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com
            </Label>
            <TestimoniFooter avatarSrc="/img/testimoni/Client Image.png" avatarAlt="Avatar 1" nama="Gemma Nolen" company="Google" />
          </div>

          <div className="testimoni-item">
            <Label className="testimoni-text">
              This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com
            </Label>
            <TestimoniFooter avatarSrc="/img/testimoni/Client Image.png" avatarAlt="Avatar 1" nama="Gemma Nolen" company="Google" />
          </div>

          <div className="testimoni-item">
            <Label className="testimoni-text">
              This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com
            </Label>
            <TestimoniFooter avatarSrc="/img/testimoni/Client Image.png" avatarAlt="Avatar 1" nama="Gemma Nolen" company="Google" />
          </div>

          <div className="testimoni-item">
            <Label className="testimoni-text">
              This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com
            </Label>
            <TestimoniFooter avatarSrc="/img/testimoni/Client Image.png" avatarAlt="Avatar 1" nama="Gemma Nolen" company="Google" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimoniOrganism;
