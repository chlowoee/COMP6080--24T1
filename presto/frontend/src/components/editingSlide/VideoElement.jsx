import React from 'react';
import ReactPlayer from 'react-player';
import { makeStyles } from '@mui/styles';

const border = location.pathname.startsWith('/edit') ? '6px solid #ccc' : 'none';
const useStyles = makeStyles({
  reactPlayer: {
    border,
    borderRadius: '4px',
    padding: '4px',
    position: 'absolute'
  }
});

/**
 * Video Element uses react-player npm library to load videos from url onto react apps
 * @param {object} element - contains information on the element
 * @returns Video Element
 */
export default function VideoElement ({ element }) {
  const classes = useStyles();

  return (
    <div>
      <ReactPlayer
        className={classes.reactPlayer}
        playing={element.autoplay}
        url={element.source}
        width={`${element.size}%`}
        height={`${element.size}%`}
      />
    </div>
  );
}
