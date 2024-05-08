import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  styled
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import DeletePresentationButton from './DeletePresentationButton';
import BackToDashboardButton from './BackToDashboardButton';
import ThumbnailButton from './ThumbnailButton';
import LogoutButton from './LogoutButton';
import TextButton from './editingSlide/TextButton';
import ImgButton from './editingSlide/ImgButton';
import VideoButton from './editingSlide/VideoButton';
import CodeButton from './editingSlide/CodeButton';
import BackgroundButton from './editingSlide/BackgroundButton';
import PreviewButton from './PreviewButton';

const useStyles = makeStyles({
  tool: {
    minHeight: '40px',
    backgroundColor: '#7a86cc',
    color: 'white',
    minWidth: '400px'
  },
  appbar: {
    minHeight: '64px',
    backgroundColor: '#3f50b5',
    color: 'white'
  }
});

/**
 * Displays the Navbar on the edit screen which consists of two toolbars. One for tools and the other for general functions.
 * @param {boolean} open - boolean indicating if the drawer is opened
 * @param {function} setOpen - toggles the drawer
 * @param {number} id - id of the presentation
 * @param {Object} store - data in database.json
 * @param {number} drawerWidth - the drawer width (240)
 * @param {function} setStore - uploads new data to database.json
 * @param {string} token - token of the user
 * @param {function} setTokenFunction - updates user token
 * @param {number} slideNum - the current slide
 * @returns a navbar!
 */
function Navbar ({ open, setOpen, id, store, setStore, drawerWidth, token, setTokenFunction, slideNum }) {
  const classes = useStyles();

  const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      })
    })
  );

  return (
    <AppBar position='fixed' open={open}>
      <Toolbar className={`${classes.appbar}`}>
        <IconButton
          color='inherit'
          aria-label='open-drawer'
          onClick={() => setOpen(true)}
          edge='start'
          sx={{ ...(open && { display: 'none' }) }}
          className='me-3'
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6'>
          Editing
        </Typography>
        <Grid container justifyContent='flex-end'>
        <BackToDashboardButton drawerOpen={open} />
            <DeletePresentationButton
              id={id}
              store={store}
              setStore={setStore}
              drawerOpen={open}
            />
            <ThumbnailButton
              id={id}
              store={store}
              setStore={setStore}
              drawerOpen={open}
            />
            <LogoutButton token={token} setToken={setTokenFunction} drawerOpen={open}/>
        </Grid>
      </Toolbar>
      <Toolbar
          variant='dense'
          className={`${classes.tool} d-flex justify-content-around`}
        >
          <TextButton
            store={store}
            setStore={setStore}
            id={id}
            slideNum={slideNum}
          />
          <ImgButton
            store={store}
            setStore={setStore}
            id={id}
            slideNum={slideNum}
          />
          <VideoButton
            store={store}
            setStore={setStore}
            id={id}
            slideNum={slideNum}
          />
          <CodeButton
            store={store}
            setStore={setStore}
            id={id}
            slideNum={slideNum}
          />
          <BackgroundButton
            store={store}
            setStore={setStore}
            id={id}
            slideNum={slideNum}
          />
          <PreviewButton id={id} />
        </Toolbar>
    </AppBar>
  );
}

export default Navbar;
