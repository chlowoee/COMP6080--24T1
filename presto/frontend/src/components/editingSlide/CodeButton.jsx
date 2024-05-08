import React from 'react';
import {
  IconButton,
} from '@mui/material';
import { Terminal as TerminalIcon } from '@mui/icons-material';
import CodeDialog from './elementDialogs/CodeDialog';

export default function CodeButton ({ store, setStore, id, slideNum }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton aria-label='text' onClick={() => setOpen(true)}>
        <TerminalIcon sx={{ color: 'white' }} />
      </IconButton>
      <CodeDialog
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
