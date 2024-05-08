import React from 'react';
import { IconButton, Drawer, Box, Divider } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import SlideCard from './SlideCard';
import NextButton from './editingSlide/NextButton';
import PrevButton from './editingSlide/PrevButton';
import EditNavbar from './EditNavbar';
import EditMainContent from './EditMainContent';
import DrawerHeader from './EditDrawerHeader';

/**
 * Creates the Responsive drawer which includes navbar, slidedeck and mainscreen elements
 * Source: https://mui.com/material-ui/react-drawer/
 * @param {number} props.id
 * @param {Object} props.store
 * @param {function} props.setStore
 * @returns
 */
export default function ResponsiveDrawers ({ id, store, setStore, token, setTokenFunction }) {
  const drawerWidth = 240;
  if (store.store[id] === undefined) {
    return <Navigate to='/dashboard' />;
  }
  const useStyles = makeStyles({
    middle: {
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)'
    },
  });
  const [open, setOpen] = React.useState(false);
  const [slideNum, setSlideNum] = React.useState(0);
  const classes = useStyles();
  const slides = store.store[id].slides;

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        setSlideNum(Math.max(0, slideNum - 1))
      } else if (event.key === 'ArrowRight') {
        setSlideNum(Math.min(slides.length - 1, slideNum + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [slideNum]);
  return (
    <Box sx={{ display: 'flex' }}>
      <EditNavbar open={open} setOpen={setOpen} id={id} store={store} setStore={setStore} drawerWidth={drawerWidth} token={token} setTokenFunction={setTokenFunction} slideNum={slideNum}/>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth
          }
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton
            aria-label='close-drawer-button'
            onClick={() => setOpen(false)}
          >
            {<ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box className='m-2'>
          {slides.map((slide, index) => (
            <SlideCard
              presId={id}
              slide={slide}
              key={index}
              slideNum={slideNum}
              index={index}
            />
          ))}
        </Box>
        <Divider />
        <div
          className={`container ${classes.middle} d-flex justify-content-around`}
        >
          <PrevButton
            slideNum={slideNum}
            slides={slides}
            setSlideNum={setSlideNum}
          />
          <NextButton
            slideNum={slideNum}
            slides={slides}
            setSlideNum={setSlideNum}
          />
        </div>
      </Drawer>
      <EditMainContent open={open} id={id} store={store} setStore={setStore} drawerWidth={drawerWidth} setSlideNum={setSlideNum} slideNum={slideNum}/>
    </Box>
  );
}
