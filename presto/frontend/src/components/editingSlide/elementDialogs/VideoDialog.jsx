import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControlLabel, Switch } from '@mui/material';
import { putStore } from '../../../Api';
import { v4 as uuidv4 } from 'uuid';
import PositionDialog from './PositionDialog';

/**
 * Video dialog that sets attributes of the video element
 */
export default function VideoDialog ({ open, setOpen, store, id, slideNum, setStore, edit, elementId }) {
  const [videoSize, setVideoSize] = React.useState('');
  const [videoSource, setVideoSource] = React.useState('');
  const [play, setPlay] = React.useState(false);
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  const saveVideo = async () => {
    try {
      const updatedStore = { ...store };
      const newElementId = uuidv4();

      if (edit) {
        const elementIndex = updatedStore.store[id].slides[slideNum].slideContent.findIndex(element => element.id === elementId);
        updatedStore.store[id].slides[slideNum].slideContent[elementIndex] = {
          ...updatedStore.store[id].slides[slideNum].slideContent[elementIndex],
          type: 'video',
          size: videoSize,
          source: videoSource,
          autoplay: play,
          x: parseInt(x),
          y: parseInt(y)
        }
      } else {
        updatedStore.store[id].slides[slideNum].slideContent.push({
          id: newElementId,
          type: 'video',
          size: videoSize,
          source: videoSource,
          autoplay: play,
          x,
          y,
          timeCreated: Date.now()
        });
      }

      await putStore(updatedStore, localStorage.getItem('token'));
      setStore(updatedStore);
      setVideoSize('');
      setVideoSource('');
      setPlay(false);
      setOpen(false);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <Dialog open={open} maxWidth='xs' onClose={() => setOpen(false)}>
      <DialogTitle>{edit ? 'Edit Video' : 'Add Video'}</DialogTitle>
      <DialogContent>
        <TextField
          label='Size'
          variant='standard'
          onChange={(e) => setVideoSize(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Video URL'
          variant='standard'
          onChange={(e) => setVideoSource(e.target.value)}
          fullWidth
          margin='normal'
        />
        <FormControlLabel
          sx={{ ml: 0, mt: 1 }}
          control={<Switch color='primary' />}
          label='Autoplay'
          labelPlacement='start'
          onChange={() => setPlay(!play)}
        />
        {edit ? <PositionDialog setX={setX} setY={setY}/> : <></>}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={() => saveVideo()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
