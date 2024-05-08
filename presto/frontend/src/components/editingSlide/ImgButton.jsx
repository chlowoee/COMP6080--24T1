import React from 'react';
import { IconButton } from '@mui/material';
import { Image as ImageIcon } from '@mui/icons-material';
import ImgDialog from './elementDialogs/ImgDialog';

export default function ImgButton ({ store, setStore, id, slideNum }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton aria-label='img' onClick={() => setOpen(true)}>
        <ImageIcon sx={{ color: 'white' }} />
      </IconButton>
      <ImgDialog
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
