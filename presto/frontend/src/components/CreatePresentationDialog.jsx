import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button
} from '@material-ui/core';

function CreatePresentationDialog ({
  open,
  close,
  create,
  newPresentationName,
  setNewPresentationName,
  description,
  setDescription
}) {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Create New Presentation</DialogTitle>
      <DialogContent>
        <TextField
          id='new-presentation-name'
          label='Presentation Name'
          variant='standard'
          value={newPresentationName}
          onChange={(e) => setNewPresentationName(e.target.value)}
          fullWidth
        />
        <TextField
          id='new-presentation-desc'
          label='Presentation Description'
          variant='standard'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button aria-label='cancel-pres' variant='outlined' color='primary' onClick={close}>
          Cancel
        </Button>
        <Button aria-label='create-pres' variant='outlined' color='primary' onClick={create}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreatePresentationDialog;
