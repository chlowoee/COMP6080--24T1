import * as React from 'react';
import { Button } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';

/**
 * next button to go to next slides
 * @param {number} slideNum - current slide number
 * @param {function} setSlideNum - updates slide num
 * @returns next button
 */
export default function NextButton ({ slideNum, slides, setSlideNum }) {
  return (
    <Button aria-label='next-slide-button'
      variant={slideNum < slides.length - 1 ? 'secondary' : 'disabled'}
      startIcon={<ChevronRightIcon />}
      onClick={() => setSlideNum(slideNum + 1)}
    >
      NEXT
    </Button>
  );
}
