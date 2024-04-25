import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
export default function Todo({ title, description, isComplete }) {
  return (
    <>
      <div className='todo'>
        <Card className='todo__card' sx={{
          minWidth: 275,
          display: 'flex',
        }}>
          <CardContent sx={{
            textAlign: 'left',
            width: '60%'
          }}>
            <Typography variant='h6'>
              {title}
            </Typography>
            <Typography variant='p' color='rgba(39,55,77,.8)'>
              {description}
            </Typography>

          </CardContent>
          <Stack style={{marginRight:'5px'}}
          width='40%' direction="row" >

            <IconButton style={{
              padding: '1.2vw'
            }}
              aria-label="completed">
              <DoneIcon className='icon done' style={{
                color: 'rgba(0,128,0,0.9)',
                backgroundColor: 'white',
                padding: '2px',
                fontSize: '1.5em',
                borderRadius: '50%',
                border: '2px solid rgba(0,128,0,0.9)'
              }} />
            </IconButton>

            <IconButton style={{
              padding: '1.2vw'
            }}
              id='edit' aria-label="edit">
              <EditIcon className='icon edit' style={{
                color: 'rgba(0,0,255,0.557)',
                padding: '2px',
                fontSize: '1.5em',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '2px solid rgba(0,0,255,0.557)'
              }} />
            </IconButton>

            <IconButton style={{
              padding: '1.2vw'
            }}
              aria-label="delete">
              <DeleteIcon className='icon dlt' style={{
                color: 'rgba(255,0,0,0.7)',
                padding: '2px',
                fontSize: '1.5em',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '2px solid rgba(255,0,0,0.7)'
              }} />
            </IconButton>
          </Stack>
        </Card>
      </div >


    </>
  )
}