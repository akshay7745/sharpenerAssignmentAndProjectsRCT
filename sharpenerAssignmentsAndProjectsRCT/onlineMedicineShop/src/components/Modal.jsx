import { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
const Backdrop = ({ handleHide }) => {
  return (
    <div
      onClick={handleHide}
      style={{
        background: "rgba(0, 0, 0, 0.7)",
        position: "fixed",
        height: "100vh",
        width: "100%",
        zIndex: 2,
        overflowY: "auto",
      }}
    ></div>
  );
};

const portalElement = document.getElementById("overlays");
const ModalOverlays = (props) => {
  return (
    <div
      style={{
        zIndex: 5,
        position: "fixed",
        background: "white",
        width: "500px",
        height: "550px",
        left: 500,
        top: 60,
        borderRadius: "10px",
      }}
    >
      <div>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop handleHide={props.handleHide} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlays>{props.children}</ModalOverlays>,
        portalElement
      )}
    </Fragment>
    // document.querySelector("#overlays")
  );
};

export default Modal;
