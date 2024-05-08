import React from 'react';
import { putStore } from './Api';
import tinygradient from 'tinygradient';

// Helper function to navigate to the login page
export const navigateToLogin = (navigate) => {
  navigate('/login');
};

// Helper function to navigate to the register page
export const navigateToRegister = (navigate) => {
  navigate('/register');
};

// Helper function to navigate to the edit page
export const navToPresentationId = (navigate, id) => {
  navigate(`/edit/presentation/${id}`);
};

// Helper function to navigate to the dashboard page
export const navigateToDashboard = (navigate) => {
  navigate('/dashboard');
};

// Source: helper.js, COMP6080 Ass2
export const fileToDataUrl = (file) => {
  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
};

/**
 *
 * Uploads modified image url to database
 *
 * @param {*} event
 * @param {*} setImage
 */
export const upload = (event, setImage) => {
  const file = event.target.files[0];
  fileToDataUrl(file).then((res) => {
    setImage(res);
  });
};

/**
 *
 * Deletes an element by finding its index and removing it from the slideContent array
 *
 * @param {*} store
 * @param {*} setStore
 * @param {*} id
 * @param {*} slideNum
 * @param {*} element
 */
export const deleteElement = async (store, setStore, id, slideNum, element) => {
  try {
    const updatedStore = { ...store };
    const elementIndex = updatedStore.store[id].slides[
      slideNum
    ].slideContent.findIndex((temp) => temp.id === element.id);

    updatedStore.store[id].slides[slideNum].slideContent.splice(
      elementIndex,
      1
    );
    await putStore(updatedStore, localStorage.getItem('token'));
    setStore(updatedStore);
  } catch (err) {
    alert(err.response.data.error);
  }
};

/**
 *
 * Checks if a screen is small depending on viewport width and if drawer is open.
 *
 * @param {boolean} drawerOpen
 * @returns {boolean} isSmallScreen
 */
export const resizeAppbar = (drawerOpen) => {
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (drawerOpen) {
        setIsSmallScreen(window.innerWidth <= 1050);
      } else {
        setIsSmallScreen(window.innerWidth < 850);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [drawerOpen]);

  return isSmallScreen;
};

/**
 * Helper function to generate gradient string for background
 * @param {object} pres
 * @param {number} slideNum
 * @returns gradient string
 */
export const generateGradientString = (pres, slideNum) => {
  let bgColour1;
  let bgColour2;
  if (!pres.slides[slideNum].currentBgColour) { // if null
    if (!pres.defaultColor) {
      bgColour1 = '#FFFFFF';
      bgColour2 = '#FFFFFF';
    } else {
      const [colour1, colour2] = pres.defaultColor.split(':').map(color => color.trim());
      bgColour1 = colour1;
      bgColour2 = colour2;
    }
  } else {
    const [colour1, colour2] = pres.slides[slideNum].currentBgColour.split(':').map(color => color.trim());
    bgColour1 = colour1;
    bgColour2 = colour2;
  }
  const gradient = tinygradient(bgColour1, bgColour2).rgb(2);
  return `linear-gradient(to right, ${gradient.map(color => color.toHexString()).join(',')})`;
}
