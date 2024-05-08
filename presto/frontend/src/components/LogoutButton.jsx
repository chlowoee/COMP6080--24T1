import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { logoutApi } from '../Api';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { resizeAppbar } from '../helper';

function Logout ({ token, setToken, drawerOpen }) {
  const navigate = useNavigate();
  const margin = location.pathname.startsWith('/dashboard') ? 'm-3' : 'm-1';
  const logout = async () => {
    logoutApi(navigate, token, setToken);
  };
  return (
    <Button aria-label='logout-button' variant='contained' className={`${margin}`} onClick={logout}
      startIcon={<ExitToAppIcon />}
  >
    {((!resizeAppbar(drawerOpen) && location.pathname.startsWith('/edit')) || location.pathname.startsWith('/dashboard')) && 'Logout'}
    </Button>
  );
}

export default Logout;
