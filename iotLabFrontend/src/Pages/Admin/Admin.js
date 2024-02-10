import React,{ useEffect, useState } from 'react';
import Navigation from '../Shared/Navigation/Navigation';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const baseUrl = "http://localhost:4000/api/v1";

const Admin = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [validUsers, setValidUsers] = useState([])
    const [requestedUsers, setRequestedUsers] = useState([])
    const [sensorDatas, setSensorDatas] = useState([])
    const [clickedUser, setClickedUser] = useState("")


    useEffect(() => {
        fetch(baseUrl+'/user/?active=YES')
            .then(res => res.json())
            .then(data => setValidUsers(data.users));
    }, [])

    useEffect(() => {
        fetch(baseUrl+'/user/?active=NO')
            .then(res => res.json())
            .then(data => setRequestedUsers(data.users));
    }, [])

    useEffect(() => {
        fetch(baseUrl+'/sensors/')
            .then(res => res.json())
            .then(data => setSensorDatas(data.sensorDatas));
    }, [])

    const verifyUser = email => {
        console.log(email)
        fetch(baseUrl+`/user/verify/?email=${email}`)
        .then(res => {
            window.location.href="/admin";
        })
        .catch(error => {
            console.error('There was an error!', error);
        })

        
    }

    //   const rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    //   ];
      
      
    return (
        <div>
            <Navigation></Navigation>
            <h3><u><i>Users</i></u></h3>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Email</b></TableCell>
            <TableCell align="right"><b>UserType</b></TableCell>
            <TableCell align="right"><b>Active</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {validUsers.map((row) => (
            <TableRow
              key={row.email}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.userType}</TableCell>
              {row.active == true ? <TableCell align="right" color='green'>Yes</TableCell> :
                                    <TableCell align="right" color='Red'>No</TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <h3><u><i>Requested Users</i></u></h3>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Email</b></TableCell>
            <TableCell align="center"><b>UserType</b></TableCell>
            <TableCell align="center"><b>Active</b></TableCell>
            <TableCell align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requestedUsers.map((row) => (
            <TableRow
              key={row.email}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="center">{row.userType}</TableCell>
              {row.active == true ? <TableCell align="center" color='green'>Yes</TableCell> :
                                    <TableCell align="center" color='Red'>No</TableCell>
              }
            <TableCell align="center">  <Button variant="outlined" onClick={() => {
                setClickedUser(row.email)
                handleOpen()
            }}>Info</Button>
            <Modal
                   open={open}
                   onClose={handleClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description"
               >
                   <Box sx={style}>
                   <Typography id="modal-modal-title" variant="h6" component="h2">
                       {clickedUser} has requested for a account for Comfort appliction.
                   </Typography>
                   <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Button variant="outlined" onClick={() => verifyUser(clickedUser)} >Verify</Button>
                   </Typography>
                   </Box>
               </Modal>
               </TableCell>
           
            </TableRow>
          
          ))
          
          }

        </TableBody>
      </Table>
    </TableContainer>

    <h3><u><i>Sensor Monitor</i></u></h3>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Time</b></TableCell>
            <TableCell align="right"><b>Sensor Count</b></TableCell>
            <TableCell align="right"><b>Health</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sensorDatas.map((row) => (
            <TableRow
              key={row.createdAt}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {new Date(row.createdAt).toLocaleString()}
              </TableCell>
              <TableCell align="right">{row.sensors}</TableCell>
              {row.sensors == 6 ? <TableCell align="right" color='green'><Button variant="contained" color="success">OK</Button></TableCell> :
                                    <TableCell align="right" color='Red'><Button variant="contained" color="error">NOT OK</Button></TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

         

        </div>
    );
};

export default Admin;