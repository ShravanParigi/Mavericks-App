import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PinnedSubheaderList from './ScheduleList.js';
import LiveGameUI from './LiveGame.js';
import MavsDashboard from './MavsInfo.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

const theme = createTheme({
  typography: {
    fontFamily: 'mavs-font, sans-serif', // Set your preferred font family
  },
});

function App() {
  return (
    <div className="landing-page">
      <div className="content">
        <div className = "text">
          <h1>Mavericks Schedule</h1>
          <Grid container spacing={1}>
            <Grid item xs={4}>
            <div className= "upcoming-games">
              <h2> Full Schedule </h2>
              {PinnedSubheaderList()}
            </div>
            </Grid>
            <Grid item xs={3.75}>
              {LiveGameUI()}
            </Grid>
            <Grid item xs={4.25}>
              <h2> Mavericks Dashboard </h2>
              {MavsDashboard()}
            </Grid>
          </Grid>
        </div>
        <div className = "phonetext">
        <h1>Mavericks Schedule</h1>
        {MavsDashboard()}
        </div>
      </div>
    </div>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default App;