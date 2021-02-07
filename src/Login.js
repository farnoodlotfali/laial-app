import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authContext from './auth/authContext';
import './Login.css';

const Login = (props) => {
  const { login, loadUser, user } = useContext(authContext);
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { username, email, password } = userInfo;
  useEffect(() => {
    loadUser();
    if (user !== null) {
      props.history.push('/');
    }
  }, [user, props.history]);

  const onchange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className='login'>
      <div className='color'></div>
      <div className='color'></div>
      <div className='color'></div>
      <div className='box'>
        <div className='square' style={{ i: '0' }}></div>
        <div className='square' style={{ i: '1' }}></div>
        <div className='square' style={{ i: '2' }}></div>
        <div className='square' style={{ i: '3' }}></div>
        <div className='square' style={{ i: '4' }}></div>
        <div className='login__container'>
          <div className='form'>
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
              {/* <div className='inputBox'>
                <input
                  autoFocus
                  onChange={onchange}
                  name='username'
                  value={username}
                  type='text'
                  placeholder='نام کاربری'
                  required
                  //  placeholder='Username'
                />
              </div>{' '} */}
              <div className='inputBox'>
                <input
                  onChange={onchange}
                  name='email'
                  type='email'
                  value={email}
                  placeholder='ایمیل'
                  required

                  //  placeholder='email'
                />
              </div>{' '}
              <div className='inputBox'>
                <input
                  required
                  onChange={onchange}
                  name='password'
                  value={password}
                  type='password'
                  placeholder='رمز ورود'
                  //  placeholder='Password'
                  minLength='8'
                />
              </div>
              <div className='notRegister pt-2'>
                <span>ثبت نام نکرده اید؟</span>

                <Link to='/register'>
                  <span> ثبت نام</span>
                </Link>
              </div>
              {/* <div className='formMsg pt-2'>{errorMsg}</div> */}
              <div className='inputBox'>
                <input
                  type='submit'
                  value='ورود'
                  // value='Register'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
