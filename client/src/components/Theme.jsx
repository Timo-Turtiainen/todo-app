import { createTheme } from '@mui/material'

/**
 * Creates a custom dark theme for the application using MUI's createTheme function.
 */
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0bbd02',
      dark: '#58ff4f',
      light: '#0bbd02',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0bbd02',
      dark: '',
      light: '',
      contrastText: '#000000',
    },
    background: {
      default: '#1e1e1e',
      paper: '#121212',
      boxShadow: '#67fa5f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#000000',
    },
  },
})
