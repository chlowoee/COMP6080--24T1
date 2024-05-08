import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Chip,
  CardActions,
  CardActionArea,
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { navToPresentationId } from '../helper';
import greySquare from '../assets/greySquare.png';
import DeletePresentationButton from './DeletePresentationButton';
import EditPresentationButton from './EditPresentationButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const useStyles = makeStyles(() => ({
  image: {
    width: '300px',
    height: '100px',
    margin: 'auto',
    marginBottom: '10px'
  },
  padside: {
    padding: '0 24px'
  },
  card: {
    width: '360px',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'centre'
  },
  accordionContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    padding: '10px 20px'
  },
}));

const PresentationCard = ({ store, id, setStore }) => {
  if (store.store[id] === undefined) {
    return null;
  }
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Card id={id} className={`${classes.card} m-3`} >
      <CardActionArea onClick={() => navToPresentationId(navigate, id)}>
        <CardHeader aria-label='pres-title' className={`${classes.title}`} title={store.store[id].name}/>
        <CardMedia
          component='img'
          src={
            store.store[id].thumbnail === 'default'
              ? greySquare
              : store.store[id].thumbnail
          }
          alt={`Thumbnail for presentation named ${store.store[id].name}`}
          className={`${classes.image}`}
        />
      </CardActionArea>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon aria-label='expand-icon' />}
        >
          <Typography variant='subtitle2'><b>Additional Info and Actions</b></Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionContent}>
        <CardContent className={`${classes.padside}`}>
          {store.store[id].description}
        </CardContent>
        <CardActions>
        <DeletePresentationButton id={id} store={store} setStore={setStore} />
        <EditPresentationButton
          onClick={() => navToPresentationId(navigate, id)}
        />
        <Chip
          label={`${store.store[id].slides.length} slide/s`}
          id='slide-count'
          variant='outlined'
          color='primary'
          className={'m-3'}
        />
      </CardActions>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default PresentationCard;
