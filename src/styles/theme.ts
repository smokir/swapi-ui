import { createTheme } from '@mui/material/styles';

import starsBg from 'assets/starsBg.png';

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': { margin: 0, padding: 0, boxSizing: 'border-box', border: 'none', outline: 'none' },
        html: { height: '100%' },
        body: {
          height: '100%',
          backgroundImage: `url(${starsBg})`,
        },
        '#root': { height: '100%', width: '100%' },
      },
    },
  },
  palette: {
    mode: 'dark',
  },
});
