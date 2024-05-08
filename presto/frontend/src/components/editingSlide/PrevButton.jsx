import * as React from 'react';
import { Button } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';

/**
 * Previous button to go to previous slides
 * @param {number} slideNum - current slide number
 * @param {function} setSlideNum - updates slide num
 * @returns previous button
 */
export default function PrevButton ({ slideNum, setSlideNum }) {
  return (
    <Button
      variant={slideNum > 0 ? 'secondary' : 'disabled'}
      startIcon={<ChevronLeftIcon />}
      onClick={() => setSlideNum(slideNum - 1)}
    >
      Prev
    </Button>
  );
}
