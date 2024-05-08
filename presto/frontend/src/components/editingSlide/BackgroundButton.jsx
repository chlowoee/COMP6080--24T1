import React from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControlLabel, RadioGroup, Radio, Typography } from '@mui/material';
import { Wallpaper as WallpaperIcon } from '@mui/icons-material';
import { TwitterPicker } from 'react-color';
import { putStore } from '../../Api';

/**
 * Background button that changes the backgroud of all slides to a solid colour
 */
export default function BackgroundButton ({ store, setStore, id, slideNum }) {
  const [open, setOpen] = React.useState(false);
  const [currentBgType, setCurrentBgType] = React.useState('none');
  const [defaultBgType, setDefaultBgType] = React.useState('none');

  const [solidCurrent, setSolidCurrent] = React.useState('');
  const [solidDefault, setSolidDefault] = React.useState('');

  const [gradient1Current, setGradient1Current] = React.useState('');
  const [gradient2Current, setGradient2Current] = React.useState('');

  const [gradient1Default, setGradient1Default] = React.useState('');
  const [gradient2Default, setGradient2Default] = React.useState('');

  const saveBackground = async () => {
    try {
      const updatedStore = { ...store };
      if (defaultBgType === 'solid') {
        updatedStore.store[id].defaultColor = `${solidDefault}:${solidDefault}`;
      } else if (defaultBgType === 'gradient') {
        updatedStore.store[id].defaultColor = `${gradient1Default}:${gradient2Default}`;
      }

      if (currentBgType === 'solid') {
        console.log('in')
        updatedStore.store[id].slides[slideNum].currentBgColour = `${solidCurrent}:${solidCurrent}`;
      } else if (currentBgType === 'gradient') {
        updatedStore.store[id].slides[slideNum].currentBgColour = `${gradient1Current}:${gradient2Current}`;
      }

      await putStore(updatedStore, localStorage.getItem('token'));

      setStore(updatedStore);
      setCurrentBgType('none');
      setDefaultBgType('none');
      setSolidCurrent('');
      setSolidDefault('');
      setGradient1Current('');
      setGradient2Current('');
      setGradient1Default('');
      setGradient2Default('');
      setOpen(false);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <>
      <IconButton aria-label='text' onClick={() => setOpen(true)}>
        <WallpaperIcon sx={{ color: 'white' }} />
      </IconButton>
      <Dialog open={open} maxWidth='xs' onClose={() => setOpen(false)}>
        <DialogTitle>
          Background Picker
        </DialogTitle>
        <DialogContent>
        <Typography variant="h6" className='m-3'>
            Current Slide Background
          </Typography>
          <RadioGroup
            aria-label="current-background-type"
            name="current-background-type"
            value={currentBgType}
            onChange={(e) => setCurrentBgType(e.target.value)}
          >
            <FormControlLabel value="solid" control={<Radio />} label="Solid Colour" />
            <FormControlLabel value="gradient" control={<Radio />} label="Gradient Colour" />
            <FormControlLabel value="none" control={<Radio />} label="None" />
          </RadioGroup>
          {currentBgType === 'solid' && (
            <TwitterPicker className='m-3' color={solidCurrent} onChange={(color) => setSolidCurrent(color.hex)} />
          )}
          {currentBgType === 'gradient' && (
            <>
              <Typography variant="body1" className='m-3'>
                Gradient Colour 1
              </Typography>
              <TwitterPicker color={gradient1Current} onChange={(color) => setGradient1Current(color.hex)} />
              <Typography variant="body1" className='m-3'>
                Gradient Colour 2
              </Typography>
              <TwitterPicker color={gradient2Current} onChange={(color) => setGradient2Current(color.hex)} />
            </>
          )}
          <Typography variant="h6" className='m-3'>
            Default Slide Background
          </Typography>
          <RadioGroup
            aria-label="default-background-type"
            name="default-background-type"
            value={defaultBgType}
            onChange={(e) => setDefaultBgType(e.target.value)}
          >
            <FormControlLabel value="solid" control={<Radio />} label="Solid Colour" />
            <FormControlLabel value="gradient" control={<Radio />} label="Gradient Colour" />
            <FormControlLabel value="none" control={<Radio />} label="None" />
          </RadioGroup>
          {defaultBgType === 'solid' && (
            <TwitterPicker className='m-3' color={solidDefault} onChange={(color) => setSolidDefault(color.hex)} />
          )}
          {defaultBgType === 'gradient' && (
            <>
              <Typography variant="body1" className='m-3'>
                Gradient Colour 1
              </Typography>
              <TwitterPicker color={gradient1Default} onChange={(color) => setGradient1Default(color.hex)} />
              <Typography variant="body1" className='m-3'>
                Gradient Colour 2
              </Typography>
              <TwitterPicker color={gradient2Default} onChange={(color) => setGradient2Default(color.hex)} />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => saveBackground()}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
