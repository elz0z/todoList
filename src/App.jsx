import './App.css'
import Container from '@mui/material/Container';
import Header from './components/Header';
import Main from './components/MainContent';
function App() {

  return (
    <Container maxWidth="sm" style={{ marginTop: "10vh" }}>
      <div className="App" >
        <Header />
        <Main />
      </div>
    </Container>

  )
}
export default App
