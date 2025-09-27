import React from 'react';
import { Box } from '@mui/material';

// Define the gradient style once
const cornerGradientStyle = {
  minHeight: '100vh', 
  background: 'radial-gradient(at 0% 0%, #2E8BC0 0%, transparent 22%), radial-gradient(at 100% 100%, #3BB273 0%, transparent 22%)',
  backgroundColor: '#ffffffff', 
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: '100%', 
  mt: 0, 
};

export default function BackgroundSlideWrapper({ children }) {
  return (
        <Box sx={cornerGradientStyle}>
            {children}
        </Box>
  );
}