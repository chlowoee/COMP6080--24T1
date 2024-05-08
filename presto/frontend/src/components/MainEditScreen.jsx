import React from 'react';
import {
  Card,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { putStore } from '../Api';
import { makeStyles } from '@mui/styles';
import SlideElement from './editingSlide/SlideElement';
import { generateGradientString } from '../helper';

function MainEditScreen ({ store, id, setStore, slideNum, drawerOpen }) {
  const useStyles = makeStyles({
    slideNumber: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    slideColour: {
      background: generateGradientString(store.store[id], slideNum),
      position: 'relative',
      height: '34vh',
      marginLeft: '24px',
      marginRight: '24px'
    }
  });
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');

  const pres = store.store[id];
  const editTitle = async () => {
    try {
      if (newTitle === '') {
        alert('Please enter a title.');
        return;
      }
      const updatedStore = { ...store };
      updatedStore.store[id].name = newTitle;
      await putStore(updatedStore, localStorage.getItem('token'));
      setStore(updatedStore);
      setOpen(false);
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  return (
    <div>
      <div className='ms-2 d-flex'>
        <h2 id='pres-name' className='m-3'>
          {pres.name}
        </h2>
        <IconButton
          aria-label='edit-pres-name-button'
          onClick={() => setOpen(true)}
        >
          <EditIcon className='mt-3 mb-3' />
        </IconButton>
      </div>
      <Card className={classes.slideColour}>
        {pres.slides[slideNum].slideContent.map((element, index) => {
          return (
            <SlideElement
              element={element}
              drawerOpen={drawerOpen}
              key={index}
              store={store}
              setStore={setStore}
              slideNum={slideNum}
              id={id}
            />
          );
        })}
        <div className={`${classes.slideNumber}`}>
          <Typography aria-label='slide-number' variant='body1'>
            {pres.slides.length === 1
              ? '1'
              : `${slideNum + 1}/${pres.slides.length}`}
          </Typography>
        </div>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Title</DialogTitle>
        <DialogContent>
          <TextField
            aria-label='edit-title-input'
            label='Edit Title'
            variant='standard'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            aria-label='edit-title-cancel'
            onClick={() => setOpen(false)}
            color='secondary'
          >
            Cancel
          </Button>
          <Button
            aria-label='edit-title-save'
            onClick={() => editTitle()}
            color='primary'
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MainEditScreen;
