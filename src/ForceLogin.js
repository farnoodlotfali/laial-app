import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import authContext from "./auth/authContext";
import "./ForceLogin.css";

const ForceLogin = () => {
  const { showLoginModal, changeShowLoginModal } = useContext(authContext);
  return (
    <Modal
      show={showLoginModal}
      onHide={() => changeShowLoginModal(false)}
      className="forceLogin"
    >
      <Modal.Header closeButton>
        <Modal.Title className="forceLogin__title">
          برای شنیدن آهنگ ها باید وارد حساب کاربری شوید
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex ">
          <Link to="/register">
            <span
              className="forceLogin__btn mr-2"
              onClick={() => changeShowLoginModal(false)}
            >
              ثبت نام
            </span>
          </Link>
          <Link to="/login">
            <span
              className="forceLogin__btn"
              onClick={() => changeShowLoginModal(false)}
            >
              ورود
            </span>
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ForceLogin;
