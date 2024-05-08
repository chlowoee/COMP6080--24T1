import React from 'react';
import NextButton from '../components/editingSlide/NextButton';
import PrevButton from '../components/editingSlide/PrevButton';
import SlideElement from '../components/editingSlide/SlideElement';
import { Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { generateGradientString } from '../helper';

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 1200px)': {
            maxWidth: 'none',
          },
          '@media (min-width: 600px)': {
            padding: '0',
          },
        },
      },
    },
  },
});

/**
 * Renders the slide and buttons for the preview
 * @param {Object} pres - presentation
 */
const SlideshowPreview = ({ pres }) => {
  const [slideNum, setSlideNum] = React.useState(0);
  const slides = pres.slides;
  return (
    <div>
      <div
          className={'container d-flex justify-content-around'}
        >
          <PrevButton
            slideNum={slideNum}
            slides={slides}
            setSlideNum={setSlideNum}
          />
          <Typography aria-label='slide-number' variant='body1' className='m-2' sx={{ color: 'text.secondary' }}>
            {slides.length === 1
              ? '1'
              : `${slideNum + 1}/${slides.length}`}
          </Typography>
          <NextButton
            slideNum={slideNum}
            slides={slides}
            setSlideNum={setSlideNum}
          />
      </div>
      <ThemeProvider theme={theme}>
        <Container sx={{
          position: 'relative',
          height: '100vh',
          background: generateGradientString(pres, slideNum),
        }}>
          {slides[slideNum].slideContent.map((element, index) => {
            return (
              <SlideElement element={element} key={index} edit={false}/>
            );
          })}
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default SlideshowPreview;
