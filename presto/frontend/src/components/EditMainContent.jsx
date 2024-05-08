import React from 'react';
import { styled } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MainEditScreen from './MainEditScreen';
import PrevButton from './editingSlide/PrevButton';
import NextButton from './editingSlide/NextButton';
import NewSlideButton from './editingSlide/NewSlideButton';
import DeleteSlideButton from './editingSlide/DeleteSlideButton';
import DrawerHeader from './EditDrawerHeader';

const useStyles = makeStyles({
  middle: {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)'
  },
});

/**
 * Displays the main content on the edit screen
 * @param {boolean} open - boolean indicating if the drawer is opened
 * @param {number} id - id of the presentation
 * @param {Object} store - data in database.json
 * @param {function} setStore - uploads new data to database.json
 * @param {number} slideNum - the current slide
 * @param {function} setSlideNum - function to update the slideNum
 * @param {number} drawerWidth - the drawer width (240)
 * @returns the main content
 */
function MainContent ({ open, id, store, setStore, slideNum, setSlideNum, drawerWidth }) {
  const classes = useStyles();
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        padding: 0
      })
    })
  );

  return (
    <Main open={open}>
      <DrawerHeader />
      <MainEditScreen id={id} store={store} setStore={setStore} slideNum={slideNum} />
      <div
          aria-label='main-screen-bottom-button'
          className={`container-fluid ${classes.middle} mt-3 d-flex justify-content-center`}
        >
          <PrevButton
            slideNum={slideNum}
            slides={store.store[id].slides}
            setSlideNum={setSlideNum}
          />
          <NewSlideButton store={store} id={id} setStore={setStore} />
          <DeleteSlideButton
            slideNum={slideNum}
            store={store}
            setSlideNum={setSlideNum}
            id={id}
            setStore={setStore}
          />
          <NextButton
            slideNum={slideNum}
            slides={store.store[id].slides}
            setSlideNum={setSlideNum}
          />
        </div>
    </Main>
  );
}

export default MainContent;
