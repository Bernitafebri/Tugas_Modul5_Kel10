import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@mui/material/Typography'

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h5" color="inherit">
            Praktikum RPLBK - Kelompok 10
            </Typography>
        </Toolbar>
      </AppBar>
      <br></br>
    </div>
  );
}

export default App;
