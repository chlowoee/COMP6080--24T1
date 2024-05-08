import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Button } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import CreatePresentationButton from './CreatePresentationButton';
import { navigateToLogin, navigateToRegister } from '../helper';

function Navbar ({ token, setTokenFunction, store, setStore }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboardRoute = location.pathname === '/dashboard';
  const isLoginRoute = location.pathname === '/login';
  const isRegisterRoute = location.pathname === '/register';
  const isPreviewRoute = location.pathname.startsWith('/preview');

  return (
    <AppBar position='static'>
      <Toolbar>
        {isDashboardRoute
          ? (
          <Typography variant='h6'>Dashboard</Typography>
            )
          : (
          <Typography variant='h6'>Presto</Typography>
            )}{' '}
        <Grid container justifyContent='flex-end' alignItems='center'>
          {isDashboardRoute && (
            <>
              <Grid item>
                <CreatePresentationButton
                  store={store}
                  token={token}
                  setStore={setStore}
                />
              </Grid>
              <Grid item>
                <LogoutButton token={token} setToken={setTokenFunction} />
              </Grid>
            </>
          )}
          {isLoginRoute && (
            <>
              <Button
                aria-label='register-button'
                variant='contained'
                className='m-3'
                onClick={() => navigateToRegister(navigate)}
              >
                Register
              </Button>
            </>
          )}
          {isRegisterRoute && (
            <>
              <Button
                aria-label='back-button'
                variant='contained'
                className='m-3'
                onClick={() => navigateToLogin(navigate)}
              >
                Back
              </Button>
            </>
          )}
          { isPreviewRoute && (
            <LogoutButton token={token} setToken={setTokenFunction} />
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
