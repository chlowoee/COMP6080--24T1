import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { registerApi } from '../Api';
import Navbar from '../components/Navbar';

function Register ({ token, setTokenFunction }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const navigate = useNavigate();

  if (token !== 'null' && token !== null) {
    return <Navigate to='/dashboard' />;
  }

  const register = async () => {
    registerApi(
      setTokenFunction,
      navigate,
      email,
      name,
      password,
      confirmPassword
    );
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
  };

  return (
    <>
      <Navbar />
      <div className='input-group m-3'>
        <span className='input-group-text'>Name</span>
        <input
          aria-label='register-name'
          type='text'
          placeholder='ie. Lebron James'
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='form-control'
        ></input>
      </div>
      <div className='input-group m-3'>
        <span className='input-group-text'>Email</span>
        <input
          type='text'
          aria-label='register-email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className='form-control'
          placeholder='ie. lebron@gmail.com'
        ></input>
      </div>
      <div className='input-group m-3'>
        <span className='input-group-text'>Password</span>
        <input
          aria-label='register-pw'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className='form-control'
        ></input>
      </div>
      <div className='input-group m-3'>
        <span className='input-group-text'>Confirm Password</span>
        <input
          aria-label='register-pw-confirm'
          type='password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          className='form-control'
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              register();
            }
          }}
        />
      </div>
      <div>
        <Button
          aria-label='register-button'
          variant='contained'
          color='primary'
          className='m-3'
          onClick={register}
        >
          Register
        </Button>
      </div>
    </>
  );
}

export default Register;
