import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import authContext from "./auth/authContext";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./Login.css";
import appContext from "./contexts/appContext";

const Login = (props) => {
  let history = useHistory();
  const { error, login, loadUser, user } = useContext(authContext);
  const { forgetPassword } = useContext(appContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { email, password } = userInfo;
  useEffect(() => {
    // if (!isUserChooseTags && user !== null) {
    //   history.push("/user-interests");
    // } else
    if (user !== null) {
      // props.history.back();
      history.goBack();
    }
    loadUser();

    // eslint-disable-next-line
  }, [user, history, error]);

  const onchange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const [emailForRest, setEmailForRest] = useState("");
  const [forgetPasswordMsg, setForgetPasswordMsg] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="login">
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
      <div className="box">
        <div className="square" style={{ i: "0" }}></div>
        <div className="square" style={{ i: "1" }}></div>
        <div className="square" style={{ i: "2" }}></div>
        <div className="square" style={{ i: "3" }}></div>
        <div className="square" style={{ i: "4" }}></div>
        <div className="login__container">
          <div className="form">
            <h2>ورود</h2>
            {/* <h2>Register</h2> */}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                login({
                  email,
                  password,
                });
              }}
            >
              <div className="inputBox">
                <input
                  onChange={onchange}
                  name="email"
                  type="email"
                  value={email}
                  placeholder="ایمیل"
                  required
                />
              </div>{" "}
              <div className="inputBox">
                <input
                  required
                  onChange={onchange}
                  name="password"
                  value={password}
                  type="password"
                  placeholder="رمز ورود"
                  minLength="8"
                />
              </div>
              <div className="error__msg__login pt-2 ">
                {error && "! کاربری با این مشخصات یافت نشد"}
              </div>
              <div className="notRegister pt-2">
                <span>ثبت نام نکرده اید؟</span>

                <Link to="/register">
                  <span> ثبت نام</span>
                </Link>
              </div>{" "}
              <div className="forgetPass pt-2">
                <div>
                  <span className="forgetPassBtn" onClick={handleOpen}>
                    فراموشی رمز؟
                  </span>
                  <Modal
                    className="forgetPassModal"
                    // className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <div className="forgetPass__content">
                        <h2>فراموشی رمز</h2>
                        <p>ایمیل خود را جهت بازیابی رمز وارد کنید</p>
                        <div className="forgetPass__form">
                          <input
                            onChange={(e) => setEmailForRest(e.target.value)}
                            name="emailForRest"
                            value={emailForRest}
                            type="email"
                          />
                          <button
                            onClick={async () => {
                              const status = await forgetPassword(emailForRest);
                              if (status === 200) {
                                setForgetPasswordMsg(
                                  "درخواست شما ثبت شد،لطفا صندوق ایمیل خود را چک کنید"
                                );
                              } else {
                                setForgetPasswordMsg("!خطا");
                              }
                              setTimeout(() => {
                                setOpen(false);
                              }, 6000);
                            }}
                          >
                            بازیابی
                          </button>
                          <div className="forgetPasswordMsg">
                            {forgetPasswordMsg}
                          </div>
                        </div>
                      </div>
                    </Fade>
                  </Modal>
                </div>
              </div>
              {/* <div className='formMsg pt-2'>{errorMsg}</div> */}
              <div className="inputBox">
                <input type="submit" value="ورود" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
