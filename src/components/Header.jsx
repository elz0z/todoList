import './Header.css'
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
export default function Header() {
  return (
    <>
      <header>
        <h1>my tasky
          <AutoAwesomeMotionIcon style={{
            marginLeft: '10px',
          }} />
        </h1>
        <hr />
      </header>
      <small>you're hero of the day </small>
    </>
  )
}