import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import appContext from './contexts/appContext';
import './PasswordReset.css';
import PasswordStrengthBar from 'react-password-strength-bar';
import { AspectRatio } from '@material-ui/icons';
import authContext from './auth/authContext';
const PasswordReset = () => {
  const history = useHistory();
  const [validateEmailMsg, setValidateEmailMsg] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [goBackLogin, setGoBackLogin] = useState(false);
  const [newToken, setNewToken] = useState(null);
  const location = useLocation();
  const { validaTetokenForgetPassword, confrimRestPassword } = useContext(
    appContext
  );
  const { user, loadUser } = useContext(authContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [password, setPassword] = useState({
    password1: '',
    password2: '',
  });
  const { password1, password2 } = password;
  const onchange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const passNotSame = () => {
    setErrorMsg('رمز اول با رمز دوم تطابق ندارد');
    setTimeout(() => {
      setErrorMsg('');
    }, 5000);
  };
  useEffect(() => {
    loadUser();
    if (user !== null) {
      // props.history.back();
      history.push('/');
    }
    if (goBackLogin) {
      history.push('/login');
    }
    const token = location.search.split('token=')[1];
    if (token) {
      //   console.log(token);
      const check = async () => {
        const status = await validaTetokenForgetPassword(token);
        if (status === 200) {
          setValidateEmailMsg(' لطفا رمز عبور جدیدی را برای ورود وارد کنید  ');
          setShowInput(true);
        } else {
          setValidateEmailMsg(
            'درخواست با خطا مواجه شد، لطفا دوباره امتحان کنید'
          );
          setShowInput(false);
        }
      };
      check();
      setNewToken(token);
    }
    // eslint-disable-next-line
  }, [goBackLogin, user]);
  return (
    <div className='passwordReset'>
      <div className='passwordResetMsg'>{validateEmailMsg}</div>
      <div className='passwordResetinfo'>
        {showInput &&
          ' رمز شما باید شامل حروف انگلیسی بزرگ و کوچک و اعداد باشد'}
      </div>
      {showInput && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (password1 !== password2) {
              passNotSame();
            } else {
              const status = await confrimRestPassword(newToken, password1);
              if (status === 200) {
                setValidateEmailMsg('با موفقیت رمز تغییر یافت');
                setTimeout(() => {
                  setGoBackLogin(true);
                }, 4000);
              } else {
                setValidateEmailMsg(
                  'درخواست با خطا مواجه شد، لطفا دوباره امتحان کنید'
                );
                setShowInput(false);
              }
            }
          }}
        >
          <div className='passwordReset__input'>
            <div className=''>
              <input
                name='password1'
                value={password1}
                onChange={onchange}
                type='password'
                minLength={8}
                placeholder='رمز جدید'
              />
              <PasswordStrengthBar password={password1} className='checkPass' />
            </div>

            <div className=''>
              <input
                name='password2'
                value={password2}
                onChange={onchange}
                type='password'
                minLength={8}
                placeholder=' تکرار رمز جدید '
              />
            </div>

            <input type='submit' value='بررسی' />
          </div>
        </form>
      )}
      <div className='passwordReset__error'>{errorMsg}</div>
      <div className='backLogin'>
        <Link to='/login'>صفحه لاگین</Link>
      </div>
    </div>
  );
};

export default PasswordReset;
