import serviceData from "./serviceData";
import Hero from "../../components/Hero";
import Breadcrumbs from "../../components/Breadcrumbs";
const breadcrumbs = [
  { label: "Home", link: "/https://sukantabyabortta.github.io/spicegarden" },
  { label: "Service" },
];

function Service({ showHero = true, showBreadcrumbs = true }) {
   const { hTxt, content } = serviceData;
  return (
    <>
    {showHero && (
      <Hero 
        title= "Our Services"
        description= "From intimate family dinners to grand Indian weddings, we cater to all your needs"
      />
      )}

    {/* Breadcrumbs */}
      {showBreadcrumbs && (
      <Breadcrumbs items={breadcrumbs} />
      )}
      
    <section className="micro-sites-section">
      <div className="container">
        <h2>{hTxt}</h2>
        {/* <p>{para}</p> */}

        <div className="micro-sites-grid">
          {content?.map((item, index) => (
            <div className="micro-site-card" key={index}>
              <div className="micro-site-icon">
                <i className={item.icon}></i>
              </div>
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

export default Service;
