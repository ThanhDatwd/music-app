
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { checkMail, checkPassword } from '../ValidateHook';
import { AiFillApple } from 'react-icons/ai'
import './login.css';

const Login = () => {
    const navigate = useNavigate();
    const [emailLogin, setEmailLogin] = React.useState('')
    const [emailLoginMs, setEmailLoginMs] = React.useState(true)
    const [passwordLogin, setPasswordLogin] = React.useState('')
    const [passwordLoginMs, setPasswordLoginMs] = React.useState(true)
    const handleCheckEmail = (e) => {
        const value = e.target.value
        const message = checkMail(value)
        setEmailLoginMs(message)
        setEmailLogin(value)
    }
    const handleCheckPassword = (e) => {
        const value = e.target.value
        const message = checkPassword(value)
        setPasswordLoginMs(message)
        setPasswordLogin(value)

    }
    const handleSubmit =async (e) => {
        e.preventDefault()
        if (!emailLoginMs && !passwordLoginMs) {
              try {
                  
               await axios({
                    method: 'post',
                    url: 'http://localhost:3001/api/auth/login',
                    data: {
                      email: emailLogin,
                      password: passwordLogin
                    }
                  })
                  .then(res=>{
                      const accessToken =res.data.accessToken
                      console.log(accessToken)
                    //   console.log(localStorage.getItem('accessToken'))
                      if(accessToken){
                          localStorage.setItem('accessToken',accessToken)
                      }
                  });
              } catch (err) {
                //   console.log(err)
                  console.log('không được')
              }

        }
        else {
            console.log('không đủ điều kiện')
        }
        // navigate('/', { replace: true });

    }
    const handleGoBack = () => {
        navigate(-1)
    }
    return (
        <div className='loginApp'>
            <div className='loginApp__navbar' >
                <div className='loginApp__navbar-logo'>nhạc hay.com</div>
                <div className='loginApp__navbar-action'>
                    <button>Đăng ký</button>
                    <button className='btn-primary'
                        onClick={handleGoBack}>Quay lại</button>
                </div>
            </div>
            {/* Phần form đăng nhập */}
            <div id='formAuth'>
                <div className='formAuth__header'>
                    <h2>Agent Login</h2>
                    <p>Hey, Hãy nhập thông tin của bạn để đăng nhập</p>
                    {/* {emailLoginMs && <div className='error-message'>{emailLoginMs}</div>} */}
                </div>
                <div className='formAuth__body'>
                    <form className='formLogin' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input type="text"
                                placeholder='Enter Email/Phone'
                                onChange={handleCheckEmail}
                                onBlur={handleCheckEmail}
                                value={emailLogin}
                            />
                            {
                                emailLoginMs && <div className='error-message'>{emailLoginMs}</div>
                            }
                        </div>
                        <div className='form-group'>
                            <input type="text"
                                placeholder='Password'
                                onChange={handleCheckPassword}
                                onBlur={handleCheckPassword}
                                value={passwordLogin} />
                            {
                                passwordLoginMs && <div className='error-message'>{passwordLoginMs}</div>
                            }
                        </div>
                        <div className='form-group'>
                            <strong>Quên mật khẩu</strong>
                        </div>
                        <div className='form-group'>
                            <button className='btn-primary' type='submit'>Sign in</button>
                        </div>
                    </form>
                    <div className='other-select'>
                        <h4> Bạn có thể đăng nhập với </h4>
                        <div className='select-list'>
                            <button><FaGoogle /> Google</button>
                            <button><AiFillApple /> Apple ID</button>
                            <button><FaFacebook /> Facebook</button>
                        </div>
                        <div className='select-rigister'>
                            Chưa có tài khoản ? <strong>Đăng ký ngay</strong>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;
