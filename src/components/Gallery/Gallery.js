import { useState } from "react";
import galleryData from "./galleryData";
import Hero from "../../components/Hero";
import Breadcrumbs from "../../components/Breadcrumbs";
const breadcrumbs = [
  { label: "Home", link: "/spicegarden" },
  { label: "gallery" },
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {/* HERO SECTION */}
      <Hero
        title="Our Food & Ambiance Gallery"
        description="Explore our delicious dishes and elegant dining atmosphere through images"
      />

      {/* BREADCRUMBS */}
      <Breadcrumbs items={breadcrumbs} />

      {/* PAGE CONTENT */}
      <div className="pageContent bgColor">
        <div className="container">
          <div className="galleryPageContent">
            <h2>{galleryData.heading}</h2>

            <ul>
              {galleryData.images.map((item, index) => (
                <li key={index}>
                  <figure>
                    <img
                      src={item.img}
                      alt={item.alt}
                      onClick={() => setSelectedImage(item.img)}
                    />
                    <div className="imageOverlay">
                      <span style={{ fontSize: "50px", color: "#fff" }}>
                        +
                      </span>
                    </div>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage} alt="Preview" />
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;