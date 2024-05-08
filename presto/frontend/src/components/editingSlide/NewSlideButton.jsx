import * as React from 'react';
import { Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { putStore } from '../../Api';

export default function NewSlideButton ({ store, setStore, id }) {
  const newSlide = async () => {
    try {
      const updatedStore = { ...store };
      const newSlideId = updatedStore.store[id].slides.length;

      updatedStore.store[id].slides[newSlideId] = {
        slideContent: [],
        currentBgColour: null
      };
      await putStore(updatedStore, localStorage.getItem('token'));
      setStore(updatedStore);
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  return (
    <Button
      aria-label='new-slide-button-main'
      variant='secondary'
      startIcon={<AddIcon />}
      onClick={() => newSlide()}
    >
      New
    </Button>
  );
}
