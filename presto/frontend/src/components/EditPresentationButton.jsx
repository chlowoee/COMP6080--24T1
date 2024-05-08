import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@material-ui/core';

function EditPresentation ({ onClick }) {
  return (
    <>
      <IconButton aria-label='edit-pres-icon-button' className='card-edit' onClick={onClick}>
        <EditIcon />
      </IconButton>
    </>
  );
}

export default EditPresentation;
