import { useState } from "react";
import Hero from "../components/Hero";
import Breadcrumbs from "../components/Breadcrumbs";
import contactData from "./contactData";
import contactForm from "./contactForm";
import DynamicForm from "../components/DynamicForm";
import { contactFormSchema } from "../components/contactFormSchema";
const breadcrumbs = [
  { label: "Home", link: "/spicegarden" },
  { label: "Contact Us" },
];

// Object Destructuring
const {infoTitle, infoCards, title, faqs} = contactData;

function Contact() {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleContactSubmit = async (data) => {
    console.log("✅ Contact Form Data:", data);
  };

  return (
    <>
      {/* HERO */}
      <Hero
        title= "Get In Touch With Us"
        description= "We'd love to hear from you! Whether you have questions, feedback, or want to make a reservation"
      />

      {/* BREADCRUMBS */}
      <Breadcrumbs items={breadcrumbs} />

      {/* CONTENT */}
      <div className="pageContent bgColor">
        <div className="container">
          <div className="general_content">

            <h2>{infoTitle}</h2>

            {/* INFO CARDS */}
            <div
              className="micro-sites-grid"
              style={{ marginBottom: "50px" }}
            >
              {infoCards.map((item, i) => (
                <div className="micro-site-card" key={i}>
                  <div className="micro-site-icon">
                    <i className={item.icon}></i>
                  </div>
                  <h3>{item.title}</h3>
                  <p
                    style={{
                      color: "#666",
                      fontSize: "15px",
                      marginTop: "10px",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* FORM + MAP */}
            <div className="contactContent">

              {/* FORM */}
              <div className="address">
                <h3>{contactForm.form.title}</h3>
               <DynamicForm
                  fields={contactForm.form.fields}
                  validationSchema={contactFormSchema}
                  onSubmit={handleContactSubmit}
                  buttonText={contactForm.form.buttonText}
                />
              </div>

              {/* MAP */}
              <div className="map">
                <h3
                  style={{
                    color: "#1e3c72",
                    marginBottom: "20px",
                  }}
                >
                  {title}
                </h3>

                <iframe
                    title="Spice Garden Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.1189!2d72.8776559!3d19.0759837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sMumbai!2sMaharashtra!5e0!3m2!1sen!2sin!4v1700000000000"
                    width="100%"
                    height="450"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{
                      border: 0,
                      borderRadius: "15px",
                    }}
                  ></iframe>
              </div>
            </div>

            {/* FAQ */}
            <div
              className="faq_category"
              style={{ marginTop: "80px" }}
            >
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "40px",
                }}
              >
                Frequently Asked Questions
              </h2>

              <div className="custom_accodion">
                {faqs.map((faq, i) => (
                  <div className="acc_wrap" key={i}>
                    
                    <div
                      className={`custom_acc_trigger ${
                        activeIndex === i ? "active" : ""
                      }`}
                      onClick={() => toggleAccordion(i)}
                    >
                      {faq.q}
                      <span className="icon">
                        {/* {activeIndex === i ? "-" : "+"} */}
                      </span>
                    </div>

                    {activeIndex === i && (
                      <div className="custom_acc_container">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
