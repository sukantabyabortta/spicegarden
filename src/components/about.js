import aboutData from "./aboutData";
import image from "../assets/images/indian-restaurant-interior.jpg";
import OurChefs from "../components/Homepage/Chef/ourChef";
import Hero from "../components/Hero";
import Breadcrumbs from "../components/Breadcrumbs";

function About({ showHero = true, showBreadcrumbs = true, showChefs = true }) {

  // Object Destructuring
  const { intro, valuesSection } = aboutData;
  
  const breadcrumbs = [
    { label: "Home", link: "https://sukantabyabortta.github.io/spicegarden/" },
    { label: "About Us" },
  ];
  return (
    <>
      {/* Hero Section */}
      {showHero && (
      <Hero
        className= "newClassForThisPage"
        title= "Our Story & Heritage"
        description= "Discover the passion and tradition behind authentic Indian flavors since 2010"
      />
      )}

      {/* Breadcrumbs */}
      {showBreadcrumbs && (
        <Breadcrumbs items = {breadcrumbs} />
      )}

      {/* Intro Content */}
      <div className="pageContent bgColor">
        <div className="container">
          <div className="general_content">
            <h2>{intro.heading}</h2>

            <img
              src={image}
              alt="Restaurant Interior"
              // style={{ width: "100%", borderRadius: "15px", marginBottom: "20px" }}
            />

            {intro.paragraphs.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Mission / Vision / Values */}
      <section className="mission-vision">
        <div className="container">
          <div className="hTxt">
            <h2>{valuesSection.title}</h2>
            <p>{valuesSection.subtitle}</p>
          </div>

          <div className="mvv-grid">
            {valuesSection.items.map((item, index) => (
              <div key={index}>
                <div className="mvv-icon">
                  <i className={item.icon}></i>
                </div>

                <h3>{item.title}</h3>

                {item.text && <p>{item.text}</p>}

                {item.list && (
                  <ul>
                    {item.list.map((li, i) => (
                      <li key={i}>{li}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {showChefs && <OurChefs />}
    </>
  );
}

export default About;
