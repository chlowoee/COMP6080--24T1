import React from 'react';
import PreviewTwoToneIcon from '@mui/icons-material/PreviewTwoTone';
import { IconButton } from '@mui/material';

export default function PreviewButton ({ id }) {
  const handlePreview = () => {
    const previewUrl = `/preview/presentation/${id}`;
    const newTab = window.open(previewUrl, '_blank');
    newTab.focus();
  };

  return (
    <IconButton onClick={() => handlePreview()}>
      <PreviewTwoToneIcon sx={{ color: 'white' }} />
    </IconButton>
  );
}
