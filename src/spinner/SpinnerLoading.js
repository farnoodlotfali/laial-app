import loadspin from "./loadspin.gif";

const SpinnerLoading = () => {
  return (
    <div
      // className="mr-auto"
      className="spinner"
      style={{
        // opacity: 0.7,
        // position: "absolute",
        // top: "50%",
        // left: "50%",
        // transform: "translate(-50%, -50%)",
        opacity: 0.7,
        position: "absolute",
        bottom: "45%",
        width: "50%",
        height: "50%",
        left: "25%",
      }}
    >
      <img
        className="mr-auto"
        src={loadspin}
        alt="..loading"
        style={{
          widows: "200px",
          display: "block",
          height: "100%",
          width: "100%",
        }}
      />
      {/* <span>در حال آماده سازی</span> */}
    </div>
  );
};

export default SpinnerLoading;
