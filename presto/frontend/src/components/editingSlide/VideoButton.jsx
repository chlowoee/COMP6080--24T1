import React from 'react';
import {
  IconButton,
} from '@mui/material';
import { VideoLibrary as VideoLibraryIcon } from '@mui/icons-material';
import VideoDialog from './elementDialogs/VideoDialog';

export default function VideoButton ({ store, setStore, id, slideNum }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton aria-label='img' onClick={() => setOpen(true)}>
        <VideoLibraryIcon sx={{ color: 'white' }} />
      </IconButton>
      <VideoDialog
        open={open}
        setOpen={setOpen}
        store={store}
        setStore={setStore}
        id={id}
        slideNum={slideNum}
        edit={false}
      />
    </>
  );
}
