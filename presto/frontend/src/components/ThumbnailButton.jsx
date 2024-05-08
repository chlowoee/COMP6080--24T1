import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { fileToDataUrl, resizeAppbar } from '../helper';
import { putStore } from '../Api';
import EditIcon from '@mui/icons-material/Edit';

function ThumbnailButton ({ id, store, setStore, drawerOpen }) {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState('');
  const isSmallScreen = resizeAppbar(drawerOpen);

  const upload = (event) => {
    const file = event.target.files[0];
    fileToDataUrl(file).then((res) => {
      setImage(res);
    });
  };

  const editThumbail = async () => {
    try {
      const updatedStore = { ...store };
      updatedStore.store[id].thumbnail = image;
      await putStore(updatedStore, localStorage.getItem('token'));
      setStore(updatedStore);
      setOpen(false);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <>
      <Button
        aria-label='thumbnail-edit-button'
        variant='contained'
        className='m-1'
        onClick={() => setOpen(true)}
        startIcon={<EditIcon />}
      >
        {!isSmallScreen && 'Edit Thumbnail'}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Thumbnail</DialogTitle>
        <DialogContent>
          <input type='file' onChange={() => upload(event)} />
        </DialogContent>
        <DialogActions>
          <Button
            aria-label='cancel-thumbnail'
            onClick={() => setOpen(false)}
            color='primary'
          >
            Cancel
          </Button>
          <Button
            aria-label='upload-thumbnail'
            onClick={() => editThumbail()}
            color='primary'
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ThumbnailButton;
