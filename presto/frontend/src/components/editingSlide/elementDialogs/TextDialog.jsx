import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { putStore } from '../../../Api';
import { v4 as uuidv4 } from 'uuid';
import PositionDialog from './PositionDialog';

/**
 * Text dialog that sets attributes of the text element
 */
export default function TextDialog ({ open, setOpen, store, id, slideNum, setStore, edit, elementId }) {
  const [textAreaSize, setTextAreaSize] = React.useState('');
  const [text, setText] = React.useState('');
  const [fontSize, setFontSize] = React.useState('');
  const [textColour, setTextColour] = React.useState('');
  const [fontFamily, setFontFamily] = React.useState('');
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  const saveText = async () => {
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
          colour: textColour,
          x: parseInt(x),
          y: parseInt(y)
        }
      } else {
        updatedStore.store[id].slides[slideNum].slideContent.push({
          id: newElementId,
          type: 'text',
          size: textAreaSize,
          text,
          fontSize,
          colour: textColour,
          fontFamily,
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
      setTextColour('');
      setOpen(false);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <Dialog open={open} maxWidth='xs' onClose={() => setOpen(false)}>
        <DialogTitle>
          {edit ? 'Edit Text' : 'Add Text'}
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
            label='Text Colour (HEX)'
            variant='standard'
            onChange={(e) => setTextColour(e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Text'
            onChange={(e) => setText(e.target.value)}
            fullWidth
            multiline
            rows={3}
            margin='normal'
          />
          <FormControl>
            <FormLabel className='mt-3' id="font-family-label">Font</FormLabel>
            <RadioGroup className='m-2'
              aria-labelledby="font-family-radio"
              name="radio-buttons-group"
              onChange={(e) => setFontFamily(e.target.value)}
            >
              <FormControlLabel value="cursive" control={<Radio />} label="Cursive" />
              <FormControlLabel value="fantasy" control={<Radio />} label="Fantasy" />
              <FormControlLabel value="monospace" control={<Radio />} label="Monospace" />
            </RadioGroup>
          </FormControl>
          {edit ? <PositionDialog setX={setX} setY={setY}/> : <></>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => saveText()}>Save</Button>
        </DialogActions>
      </Dialog>
  );
}
