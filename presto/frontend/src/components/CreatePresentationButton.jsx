import React, { useState } from 'react';
import { putStore } from '../Api';
import CreatePresentationDialog from './CreatePresentationDialog';
import { Button } from '@material-ui/core';

function CreatePresentation ({ store, token, setStore }) {
  const [newPresentationName, setNewPresentationName] = useState('');
  const [description, setDescription] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const createNewPresentation = async () => {
    try {
      const newStore = { ...store };
      let presId;
      if (Object.keys(newStore.store).length === 0) {
        presId = 1;
      } else {
        const maxKey = Math.max(...Object.keys(newStore.store));
        presId = maxKey + 1;
      }
      const newPresentation = {
        name: newPresentationName,
        description,
        defaultColor: null,
        thumbnail: 'default',
        slides: [{ slideContent: [], currentBgColour: null }]
      };
      newStore.store[presId] = newPresentation;
      await putStore(newStore, token);
      setStore(newStore);
      setDialogOpen(false);
      setNewPresentationName('');
      setDescription('');
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <>
      <Button
        aria-label='new-pres-button'
        variant='contained'
        className='mt-3 mb-3'
        onClick={() => setDialogOpen(true)}
      >
        New Presentation
      </Button>
      <CreatePresentationDialog
        open={dialogOpen}
        close={() => setDialogOpen(false)}
        create={createNewPresentation}
        newPresentationName={newPresentationName}
        setNewPresentationName={setNewPresentationName}
        description={description}
        setDescription={setDescription}
      />
    </>
  );
}

export default CreatePresentation;
