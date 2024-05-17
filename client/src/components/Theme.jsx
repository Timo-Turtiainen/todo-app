import { createTheme } from '@mui/material'

/**
 * Creates a custom dark theme for the application using MUI's createTheme function.
 */
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    activeGreen: '#58ff4f',
    primaryGreen: '#0bbd02',
    background: {
      paper: '#121212',
      primary: '#1e1e1e',
    },
  },
})
