import React from 'react';
import {
  IconButton,
} from '@mui/material';
import { Title as TitleIcon } from '@mui/icons-material';
import TextDialog from './elementDialogs/TextDialog';

export default function TextButton ({ store, setStore, id, slideNum }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <IconButton aria-label='text' onClick={() => setOpen(true)}>
        <TitleIcon sx={{ color: 'white' }} />
      </IconButton>
      <TextDialog open={open} setOpen={setOpen} store={store} setStore={setStore} id={id} slideNum={slideNum} edit={false}/>
    </>
  );
}
