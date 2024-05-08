import * as React from 'react';
import { Button } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { putStore } from '../../Api';

export default function DeleteSlideButton ({
  store,
  setStore,
  id,
  slideNum,
  setSlideNum
}) {
  const deleteSlide = async () => {
    try {
      const updatedStore = { ...store };
      if (updatedStore.store[id].slides.length === 1) {
        alert(
          'Cannot delete the only slide in the slideshow deck. Please delete the presentation instead.'
        );
        return;
      }
      setSlideNum(0);
      updatedStore.store[id].slides.splice(slideNum, 1);
      await putStore(updatedStore, localStorage.getItem('token'));
      setStore(updatedStore);
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  return (
    <Button
      variant='secondary'
      startIcon={<DeleteIcon />}
      onClick={() => deleteSlide()}
    >
      Delete
    </Button>
  );
}
