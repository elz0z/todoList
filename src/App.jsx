import './App.css'
import Container from '@mui/material/Container';
import Header from './components/Header';
import Main from './components/MainContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { ToastProvider } from './contexts/toastContext'

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#27374d',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" className='container'>
        <div className="App" >
          <Header />
          <ToastProvider>
            <Main />
          </ToastProvider >
        </div>
      </Container >
    </ThemeProvider>

  )
}
export default App