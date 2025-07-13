import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FFB6C1', // Pastel pink
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFD6E0', // Lighter pastel pink
      contrastText: '#6C3483',
    },
    info: {
      main: '#A7C7E7', // Pastel blue
    },
    background: {
      default: '#FFF0F6', // Very light pink
      paper: '#fff',
    },
    success: {
      main: '#B5EAD7', // Pastel green
    },
    warning: {
      main: '#FFDAC1', // Pastel orange
    },
    error: {
      main: '#FF9AA2', // Pastel red
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
)
