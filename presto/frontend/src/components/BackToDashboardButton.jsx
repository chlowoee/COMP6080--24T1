import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { navigateToDashboard, resizeAppbar } from '../helper';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function BackToDashboardButton ({ drawerOpen }) {
  const navigate = useNavigate();
  const isSmallScreen = resizeAppbar(drawerOpen);
  return (
    <Button
      aria-label='back-to-dash-button'
      variant='contained'
      className='m-1'
      onClick={() => navigateToDashboard(navigate)}
      startIcon={<ArrowBackIosNewIcon />}
    >
      {!isSmallScreen && 'Back'}
    </Button>
  );
}

export default BackToDashboardButton;
