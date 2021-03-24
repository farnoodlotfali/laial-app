import spinner2 from "./Spinner2.gif";

const SpinnerOnUserPlaylist = () => {
  return (
    <div className="spinner" style={{ width: "120px", height: "120px" }}>
      <img
        src={spinner2}
        alt="..loading"
        style={{
          width: "100%",
          height: "100%",
          margin: "auto",
          display: "block",
        }}
      />
    </div>
  );
};

export default SpinnerOnUserPlaylist;
