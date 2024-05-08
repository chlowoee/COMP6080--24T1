import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import { putStore } from '../../../Api';
import { v4 as uuidv4 } from 'uuid';
import PositionDialog from './PositionDialog';
import { upload } from '../../../helper';

/**
 * Image dialog that sets attributes of the image element
 */
export default function ImgDialog ({ open, setOpen, store, id, slideNum, setStore, edit, elementId }) {
  const [imgSize, setImgSize] = React.useState('');
  const [imgSource, setImgSource] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  const saveImg = async () => {
    try {
      const updatedStore = { ...store };
      const newElementId = uuidv4();

      if (edit) {
        const elementIndex = updatedStore.store[id].slides[slideNum].slideContent.findIndex(element => element.id === elementId);
        updatedStore.store[id].slides[slideNum].slideContent[elementIndex] = {
          ...updatedStore.store[id].slides[slideNum].slideContent[elementIndex],
          type: 'img',
          size: imgSize,
          source: imgSource,
          description,
          x: parseInt(x),
          y: parseInt(y)
        }
      } else {
        updatedStore.store[id].slides[slideNum].slideContent.push({
          id: newElementId,
          type: 'img',
          size: imgSize,
          source: imgSource,
          description,
          x,
          y,
          timeCreated: Date.now()
        });
      }

      await putStore(updatedStore, localStorage.getItem('token'));
      setStore(updatedStore);
      setImgSize('');
      setImgSource('');
      setDescription('');
      setOpen(false);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <Dialog open={open} maxWidth='xs' onClose={() => setOpen(false)}>
        <DialogTitle>{edit ? 'Edit Image' : 'Add Image'}</DialogTitle>
        <DialogContent>
          <TextField
            label='Size'
            variant='standard'
            onChange={(e) => setImgSize(e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Description'
            variant='standard'
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Image URL'
            variant='standard'
            onChange={(e) => setImgSource(e.target.value)}
            fullWidth
            margin='normal'
          />
          <Typography variant='subtitle2' align='center' className='mt-2'>
            OR
          </Typography>
          <input
            className='mt-3'
            type='file'
            onChange={() => upload(event, setImgSource)}
          />
          {edit ? <PositionDialog setX={setX} setY={setY}/> : <></>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => saveImg()}>Save</Button>
        </DialogActions>
      </Dialog>
  );
}
