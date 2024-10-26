import { useState } from "react";
import SliderImgList from "./SliderImgList";
import "./Slider.css";
function HeroSlider() {
  const heroSlideimg = [
    {
      imagepath:
        "https://www.hometown.in/cdn/shop/files/17_9aa7c031-e720-44e3-b446-98c83e6739d9.png?v=1727429490",
      alt: "Living Room Furniture Package",
    },

    {
      imagepath:
        "https://www.hometown.in/cdn/shop/files/19_666b2044-877d-4139-a30b-56adc95f920b.png?v=1727429491",
      alt: "Tale of Table",
    },
    {
      imagepath:
        "https://www.hometown.in/cdn/shop/files/21_5962b76d-1e69-496e-93d6-81cca27adb4c.png?v=1727437132",
      alt: "Celebrating Offers",
    },
    {
      imagepath:
        "https://www.hometown.in/cdn/shop/files/21_5962b76d-1e69-496e-93d6-81cca27adb4c.png?v=1727437132",
      alt: "Celebrating Offers",
    },
  ];
  const [activeInd, setactiveInd] = useState(0);

  function nextSlide() {
    activeInd + 1 <= heroSlideimg.length - 1
      ? setactiveInd(activeInd + 1)
      : setactiveInd(0);
  }
  function prevSlide() {
    activeInd - 1 >= 0
      ? setactiveInd(activeInd - 1)
      : setactiveInd(heroSlideimg.length - 1);
  }

  return (
    <div>
      <div className="container my-3">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {heroSlideimg.map((slide, index) => (
              <SliderImgList
                slide={slide}
                key={index}
                isActive={index === activeInd}
              />
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
            onClick={prevSlide}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
            onClick={nextSlide}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSlider;
