import "./Slider.css";
/* eslint-disable react/prop-types */
function SliderImgList({ slide, isActive }) {
  return (
    <div
      className={`carousel-item ${isActive ? "active" : ""} fixed-dimensions`}
    >
      <img src={slide.imagepath} className="d-block w-100" alt={slide.alt} />
    </div>
  );
}

export default SliderImgList;
