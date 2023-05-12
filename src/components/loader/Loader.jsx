import loaderImg from "../../assets/loader.gif";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="fixed z-30 h-screen w-screen bg-gray-200 opacity-40">
      <div className="fixed left-1/2 top-1/2 z-50">
        <img src={loaderImg} className="w-16" alt="loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

const SpinnerImg = () => {
  return (
    <div className="div">
      <img src={loaderImg} alt="loading..." />
    </div>
  );
};

export default Loader;
