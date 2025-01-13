import BounceLoader from "react-spinners/BounceLoader";

function SpinLoader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <BounceLoader color="#4db6ac" />
    </div>
  );
}

export default SpinLoader;
