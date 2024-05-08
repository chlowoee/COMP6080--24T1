import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { putStore } from '../../../Api';
import { v4 as uuidv4 } from 'uuid';
import PositionDialog from './PositionDialog';

/**
 * Code dialog that sets attributes of the Code element
 */
export default function CodeDialog ({ open, setOpen, store, id, slideNum, setStore, edit, elementId }) {
  const [textAreaSize, setTextAreaSize] = React.useState('');
  const [text, setText] = React.useState('');
  const [fontSize, setFontSize] = React.useState('');
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  const saveCode = async () => {
    try {
      const updatedStore = { ...store };
      const newElementId = uuidv4();

      if (edit) {
        const elementIndex = updatedStore.store[id].slides[slideNum].slideContent.findIndex(element => element.id === elementId);
        updatedStore.store[id].slides[slideNum].slideContent[elementIndex] = {
          ...updatedStore.store[id].slides[slideNum].slideContent[elementIndex],
          size: textAreaSize,
          text,
          fontSize,
          x: parseInt(x),
          y: parseInt(y),
        }
      } else {
        updatedStore.store[id].slides[slideNum].slideContent.push({
          id: newElementId,
          type: 'code',
          size: textAreaSize,
          text,
          fontSize,
          x,
          y,
          timeCreated: Date.now()
        });
      }

      await putStore(updatedStore, localStorage.getItem('token'));
      setStore(updatedStore);
      setTextAreaSize('');
      setText('');
      setFontSize('');
      setOpen(false);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <Dialog open={open} maxWidth='xs' onClose={() => setOpen(false)}>
      <DialogTitle>
        {edit ? 'Edit Code' : 'Add Code'}
      </DialogTitle>
      <DialogContent>
      <TextField
          label='Size'
          variant='standard'
          onChange={(e) => setTextAreaSize(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Font Size (em)'
          variant='standard'
          onChange={(e) => setFontSize(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Code'
          onChange={(e) => setText(e.target.value)}
          fullWidth
          multiline
          rows={3}
          margin='normal'
        />
        {edit ? <PositionDialog setX={setX} setY={setY}/> : <></>}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={() => saveCode()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
