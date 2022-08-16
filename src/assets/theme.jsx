import React from 'react';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0E5400',
      contrastText: '#fff',
    },
    secondary: {
      main: green[600],
    },
    background: { default: '#cac6c6', paper: '#FFF' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f3f3f3',
          //   backgroundImage: 'linear-gradient(180deg, rgba(255,167,81,1) 31%, rgba(255,226,89,1) 78%)',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: green[700],
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: green[700],
        },
      },
    },
  },
});

export default theme;