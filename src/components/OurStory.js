import { useState, useEffect, useRef } from "react";
import banner from "../assets/images/banner.png";
import biryani from "../assets/images/biryani.jpg";
import thali from "../assets/images/thali.jpg";
import kitchen from "../assets/images/tandoor-kitchen.jpg";
import Breadcrumbs from "../components/Breadcrumbs";
import Counter from "../components/counter";

function OurStory() {
  const images = [banner, biryani, thali, kitchen];
  const [index, setIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isAutoPlay) return;

    intervalRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlay, images.length]);

  const prevSlide = () => {
    setIsAutoPlay(false);
    setIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setIsAutoPlay(false);
    setIndex(prev => (prev + 1) % images.length);
  };

  const breadcrumbs = [
    { label: "Home", link: "/spicegarden" },
    { label: "Our Story" },
  ];

  return (
    <>
      <Breadcrumbs items = {breadcrumbs} />
      <div className="slider">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <img key={i} src={img} alt="" />
          ))}
        </div>

        <button onClick={prevSlide} className="prevSlide">&#9664;</button>
        <button onClick={nextSlide} className="nextSlide">&#9654;</button>

        <button
          className="playPauseBtn"
          onClick={() => setIsAutoPlay(p => !p)}
        >
          {isAutoPlay ? "❚❚" : "▶"}
        </button>
      </div>

      <Counter 
        className="container"
      />
    </>
  );
}

export default OurStory;