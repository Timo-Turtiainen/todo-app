import { createTheme } from '@mui/material'

/**
 * Creates a custom dark theme for the application using MUI's createTheme function.
 */
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    activeBorder: '#58ff4f',
    selected: '#0bbd02',
    background: {
      paper: '#121212',
    },
  },
})
