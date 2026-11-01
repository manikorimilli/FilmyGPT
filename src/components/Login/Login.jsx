import React, { useState, useRef } from 'react'
import "./Login.css"
import { checkValidation, getAuthErrorMessage } from '../../utils/validation'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../utils/firebase"
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/userSlice';
import { IoEyeOutline, IoEyeOffOutline, IoAlertCircle } from "react-icons/io5";
import Header from '../Header/Header';

const Login = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const email = useRef();
  const password = useRef();
  const name = useRef();

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailVal = email.current.value.trim();
    const passwordVal = password.current.value;
    const message = isLogin
      ? checkValidation(emailVal, passwordVal)
      : checkValidation(emailVal, passwordVal, name.current.value);
    setErrorMessage(message);

    //if still i found any errors in the validation
    if (message) return;

    //signUp and signIn API's for authentication using the firebase
    setLoading(true);
    try {
      if (!isLogin) {
        const { user } = await createUserWithEmailAndPassword(auth, emailVal, passwordVal);
        const displayName = name.current.value.trim();
        await updateProfile(user, { displayName });
        dispatch(addUser({ uid: user.uid, email: user.email, displayName }));
      } else {
        await signInWithEmailAndPassword(auth, emailVal, passwordVal);
      }
      // AuthLayout navigates to /browse once Firebase reports the user
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error.code));
      setLoading(false);
    }
  }

  return (
    <div className='login-page'>
      <Header />

      <form onSubmit={handleSubmit} className='login-form' noValidate>

        <h1>{isLogin ? "Sign In" : "Create account"}</h1>
        <p className='login-subtitle'>
          {isLogin ? "Welcome back. Unlimited trailers and AI picks await." : "Join FilmyGPT and let AI find your next favourite film."}
        </p>

        {!isLogin && (
          <input ref={name} type="text" placeholder='Full name' autoComplete='name' aria-label='Full name' />
        )}

        <input ref={email} type="email" placeholder='Email address' autoComplete='email' aria-label='Email address' />

        <div className='password-field'>
          <input
            ref={password}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            aria-label='Password'
          />
          <button
            type='button'
            className='password-toggle'
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </button>
        </div>

        {errorMessage && (
          <p className='error-msg' role='alert'><IoAlertCircle /> <span>{errorMessage}</span></p>
        )}

        <button type='submit' className='btn btn-brand login-submit' disabled={loading}>
          {loading ? <span className='spinner'></span> : (isLogin ? "Sign In" : "Sign Up")}
        </button>

        <p className='normal-msg'>
          {isLogin ? "New to FilmyGPT?" : "Already have an account?"}{" "}
          <button type='button' onClick={handleToggleForm} className='link-btn'>
            {isLogin ? "Sign up now" : "Sign in"}
          </button>
        </p>
      </form>

    </div>
  )
}

export default Login
