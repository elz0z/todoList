import './App.css'
import { useState } from 'react'
import Container from '@mui/material/Container';
import Header from './components/Header';
import Main from './components/MainContent';
import SnackBar from './components/SnackBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { ToastContext } from './contexts/toastContext.js'

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#27374d',
      },
    },
  });
  const [open, setOpen] = useState(false);
const [message, setMessage] = useState('');

function showHideToast(message) {
  setMessage(message)
  setOpen(true)
  setTimeout(_ => { setOpen(false) }, 2000);
}
  
  return (
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={showHideToast} >
        <Container maxWidth="sm" style={{ marginTop: "10vh" }}>
          <div className="App" >
            <Header />
            <Main />
          </div>
          <SnackBar open={open} message={message} />
        </Container >
      </ToastContext.Provider >

    </ThemeProvider>

  )
}
export default App
