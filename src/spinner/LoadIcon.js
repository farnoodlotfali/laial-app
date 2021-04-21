import LoadIcongif from "./LoadIcon.gif";
const LoadIcon = () => {
  return (
    <div
      // className='mr-auto'
      // className="spinner"
      style={{
        display: "flex",
        height: "55px",
        opacity: 0.7,
        justifyContent: "center",
        position: "relative",
        // top: '1%',
        // top: "50%",
        // left: "50%",
        // transform: "translate(-50%, -50%)",
      }}
    >
      <img
        // className='mr-auto'
        src={LoadIcongif}
        alt="..loading"
        style={{ widows: "200px", display: "block" }}
      />
    </div>
  );
};

export default LoadIcon;
