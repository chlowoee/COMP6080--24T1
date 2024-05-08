import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import EditPresentation from './pages/EditPresentation';
import Preview from './pages/Preview';

/**
 *
 * App that allows users to register an account and create presentations
 * Source: COMP6080 Assignment 4 Lecture
 * @returns Presto app!
 */
function App () {
  let lsToken = null;
  if (localStorage.getItem('token')) {
    lsToken = localStorage.getItem('token');
  }
  const [token, setToken] = React.useState(lsToken);

  const setTokenAbstract = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/dashboard'
            element={
              <Dashboard token={token} setTokenFunction={setTokenAbstract} />
            }
          />
          <Route
            path='/register'
            element={
              <Register
                token={token}
                setTokenFunction={setTokenAbstract}
                pet='dog'
                food='pasta'
              />
            }
          />
          <Route
            path='/login'
            element={
              <Login token={token} setTokenFunction={setTokenAbstract} />
            }
          />
          <Route path='/edit/presentation/:id' element={<EditPresentation token={token} setTokenFunction={setTokenAbstract}/>} />
          <Route path='/preview/presentation/:id' element={<Preview token={token} setTokenFunction={setTokenAbstract}/>} />
          <Route path='/*' element={<Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
