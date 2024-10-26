/* eslint-disable react/prop-types */
const Star = ({ filled }) => {
  return <span style={{ color: "#FFD700" }}>{filled ? "★" : "☆"}</span>;
};

// Rating Component
const Rating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(<Star key={i} filled={i <= rating} />);
  }

  return <div>Rating {stars}</div>;
};

export default Rating;
