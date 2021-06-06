import { Snackbar } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import authContext from "./auth/authContext";
import "./Register.css";
import SnackBarComponent from "./snackBarComponent/SnackBarComponent";

// const useStyles = makeStyles({
//   paper: {
//     background: "red",
//   },
// });
const Register = (props) => {
  // const classes = useStyles();
  const { user, register } = useContext(authContext);
  const [showMsg, setShowMsg] = useState({
    showMsg: false,
    msg: " ",
  });
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
  });
  useEffect(() => {
    // loadUser();

    if (user !== null) {
      props.history.push("/user-interests");
    }
    // eslint-disable-next-line
  }, [user, props.history]);
  // const [errorMsg, setErrorMsg] = useState("");
  const { username, email, password, password2, first_name, last_name } =
    userInfo;
  const onchange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  // const passNotSame = () => {
  //   setErrorMsg("رمز اول با رمز دوم تطابق ندارد");
  //   setTimeout(() => {
  //     setErrorMsg("");
  //   }, 5000);
  // };
  const registerError = () => {
    setShowMsg({
      showMsg: true,
      msg: "  نام کاربری ویا ایمیل در سیستم موجود است",
    });
  };

  return (
    <>
      <SnackBarComponent
        showMsg={showMsg.showMsg}
        setShowMsg={setShowMsg}
        isSuccess={false}
        msg={showMsg.msg}
      />

      <div className="register bg-light">
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
          <div className="square" style={{ i: "0" }}></div>
          <div className="square" style={{ i: "1" }}></div>
          <div className="square" style={{ i: "2" }}></div>
          <div className="square" style={{ i: "3" }}></div>
          <div className="square" style={{ i: "4" }}></div>
          <div className="register__container">
            <div className="form">
              <h2>ثبت نام</h2>
              {/* <h2>Register</h2> */}

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (password !== password2) {
                    // passNotSame();
                    // console.log(1);
                    setShowMsg({
                      showMsg: true,
                      msg: "رمز اول با رمز دوم تطابق ندارد",
                    });
                  } else {
                    const success = await register({
                      username,
                      email,
                      password,
                      first_name,
                      last_name,
                    });
                    if (!success) {
                      registerError();
                    }
                  }
                }}
              >
                <div className="inputBox">
                  <input
                    autoFocus
                    onChange={onchange}
                    name="username"
                    value={username}
                    type="text"
                    placeholder="نام کاربری"
                    required
                    //  placeholder='Username'
                  />
                </div>
                <div className="inputBox">
                  <input
                    onChange={onchange}
                    name="first_name"
                    value={first_name}
                    type="text"
                    placeholder="نام "
                    required
                  />
                </div>
                <div className="inputBox">
                  <input
                    onChange={onchange}
                    name="last_name"
                    value={last_name}
                    type="text"
                    placeholder="نام خانوادگی"
                    required
                  />
                </div>
                <div className="inputBox">
                  <input
                    onChange={onchange}
                    name="email"
                    type="email"
                    value={email}
                    placeholder="ایمیل"
                    required

                    //  placeholder='email'
                  />
                </div>
                <div className="inputBox">
                  <input
                    required
                    onChange={onchange}
                    name="password"
                    value={password}
                    type="password"
                    placeholder="رمز ورود"
                    //  placeholder='Password'
                    minLength="8"
                  />
                </div>
                <div className="inputBox">
                  <input
                    onChange={onchange}
                    name="password2"
                    value={password2}
                    type="password"
                    placeholder="تکرار رمز ورود"
                    //  placeholder='Password'
                    minLength="8"
                    required
                  />
                </div>
                {/* <div className="formMsg pt-2">{errorMsg}</div> */}
                <div className="error__msg__register">
                  {/* {error &&
                    setShowError({
                      showError: true,
                      msg: "  نام کاربری ویا ایمیل در سیستم موجود است",
                    })} */}
                </div>
                <div className="inputBox">
                  <input
                    type="submit"
                    value="ثبت نام"
                    // value='Register'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
