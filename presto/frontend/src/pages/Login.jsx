import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { loginApi } from '../Api';
import Navbar from '../components/Navbar';

function Login ({ token, setTokenFunction }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  if (token !== 'null' && token !== null) {
    return <Navigate to='/dashboard' />;
  }

  const login = async () => {
    loginApi(setTokenFunction, navigate, email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Navbar />
      <div className='input-group m-3'>
        <span className='input-group-text'>Email</span>
        <input
          type='text'
          aria-label='email-input'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className='form-control'
          placeholder='ie. lebron@gmail.com'
        ></input>
      </div>
      <div className='input-group m-3'>
        <span className='input-group-text'>Password</span>
        <input
          type='password'
          aria-label='pw-input'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className='form-control'
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              login();
            }
          }}
        ></input>
      </div>
      <div>
        <Button
          aria-label='login-button'
          variant='contained'
          color='primary'
          className='m-3'
          onClick={login}
        >
          Login
        </Button>
      </div>
    </>
  );
}

export default Login;
