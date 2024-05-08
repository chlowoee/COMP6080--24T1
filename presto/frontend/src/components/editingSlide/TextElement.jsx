import React from 'react';
import { Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

/**
 * Renders the text element on the page for editing and preview.
 * @param {*} element
 * @param {*} id
 * @param {*} slideNum
 * @param {*} store
 * @param {*} setStore
 * @param {*} edit
 * @returns Text Element
 */
export default function TextElement ({ element }) {
  let fontColour;
  if (element.colour) {
    fontColour = element.colour.startsWith('#')
      ? element.colour
      : '#' + element.colour;
  } else {
    fontColour = '#FFFFFF';
  }
  const useStyles = makeStyles({
    textBox: {
      color: `${fontColour}`,
      fontSize: element.fontSize + 'rem !important',
      fontFamily: element.fontFamily + ' !important'
    }
  });
  const classes = useStyles();

  // if pathname = edit, include border
  return (
    <Box
      sx={{
        border: location.pathname.startsWith('/edit') ? '1px solid #ccc' : 'none',
        padding: '1px',
        height: `${element.size}%`,
        width: `${element.size}%`,
        overflow: 'hidden',
        position: 'absolute',
        left: `${element.x}%`,
        top: `${element.y}%`
      }}
    >
      <Typography noWrap={false} className={`${classes.textBox}`}>
        {element.text}
      </Typography>
    </Box>
  );
}
