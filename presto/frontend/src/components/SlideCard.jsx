import React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { makeStyles } from '@mui/styles';

const SlideCard = ({ index, slideNum, slide }) => {
  const useStyles = makeStyles({
    grey: {
      backgroundColor: '#f0f0f0'
    }
  });
  const classes = useStyles();
  const isGrey = index === slideNum;
  return (
    <Card className={isGrey ? `${classes.grey} m-2` : 'm-2'}>
      <CardHeader title={`Slide #${index + 1}`} />
      <CardContent>This card has {slide.slideContent.length} element/s</CardContent>
    </Card>
  );
};

export default SlideCard;
