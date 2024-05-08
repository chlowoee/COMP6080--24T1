import React from 'react';
import { Grid } from '@material-ui/core';
import PresentationCard from './PresentationCard';

function PresentationList ({ store, setStore }) {
  if (store === undefined || Object.keys(store.store).length === 0) {
    return null;
  } else {
    const presentationIds = Object.keys(store.store);
    return (
      <Grid container spacing={2} direction='row' justifyContent='space-around'>
        {presentationIds.map((presentationId) => (
          <Grid item key={presentationId}>
            <PresentationCard
              store={store}
              id={presentationId}
              setStore={setStore}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default PresentationList;
