import { Typography, TextField } from '@mui/material';
import React from 'react';

/**
 * Position dialog that sets the new position of the text element
 */
export default function PositionDialog ({ setX, setY }) {
  return (
    <>
    <Typography className='mt-3'>
      Position
    </Typography>
    <TextField
      label='X Coordinate (between 0 and 100)'
      variant='standard'
      onChange={(e) => setX(e.target.value)}
      fullWidth
      type='number'
    />
    <TextField
      label='Y Coordinate (between 0 and 100)'
      variant='standard'
      onChange={(e) => setY(e.target.value)}
      fullWidth
      type='number'
    />
    </>
  );
}
