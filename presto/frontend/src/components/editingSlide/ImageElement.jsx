import React from 'react';
import { Box } from '@mui/material';

/**
 * Image Element
 * @param {object} element - contains information on the element
 * @returns Image Element
 */
export default function ImageElement ({ element }) {
  return (
    <Box
      component='img'
      sx={{
        height: `${element.size}%`,
        width: `${element.size}%`,
        position: 'absolute',
        left: `${element.x}%`,
        top: `${element.y}%`
      }}
      alt={element.description}
      src={element.source}
    />
  );
}
