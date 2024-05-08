import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { putStore } from '../Api';
import { navigateToDashboard, resizeAppbar } from '../helper';

function DeletePresentation ({ id, store, setStore, drawerOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isSmallScreen = resizeAppbar(drawerOpen);
  const isDashboard = location.pathname.startsWith('/dashboard');

  const handleDelete = async () => {
    try {
      const updatedStore = { ...store };
      delete updatedStore.store[id];
      await putStore(updatedStore, localStorage.getItem('token'));
      setStore(updatedStore);
      navigateToDashboard(navigate);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  let deleteButton;
  if (isDashboard) {
    deleteButton = (
      <IconButton
        aria-label='delete'
        onClick={() => setOpen(true)}
        className='m-1'
      >
        <DeleteIcon />
      </IconButton>
    );
  } else {
    deleteButton = (
      <Button
        aria-label='delete'
        variant='contained'
        startIcon={<DeleteIcon />}
        onClick={() => setOpen(true)}
        className='m-1'
      >
        {(!isSmallScreen) && 'Delete Pres'}
      </Button>
    );
  }

  return (
    <>
      {deleteButton}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this presentation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button aria-label='no-button' onClick={() => setOpen(false)} color='secondary'>
            No
          </Button>
          <Button aria-label='yes-button' onClick={() => handleDelete()} color='primary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeletePresentation;
