
import './App.css';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import PinnedSubheaderList from './ScheduleList.js';
import LiveGameUI from './LiveGame.js';
import MavsDashboard from './MavsInfo.js';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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

function App() {
  const [display, setDisplay] = React.useState('live');

  const handleDisplay = (event, newDisplay) => {
    if (newDisplay !== null){
      setDisplay(newDisplay);
    }
  };

  const renderSelected = () => {
    switch (display) {
      case 'left':
        return (
          <div>
            <div style={{'margin':'0 10vw'}} >
              {PinnedSubheaderList()}
            </div>
            <div style={{'display':'none'}}>
              {LiveGameUI()}
            </div>
            <div style={{'display':'none'}}>
              {MavsDashboard()}
            </div>
          </div>
        );
      case 'live':
        return (
          <div>
            <div style={{'display':'none'}}>
              {PinnedSubheaderList()}
            </div>
            <div  style={{'margin':'0 10vw'}} >
              {LiveGameUI()}
            </div>
            <div style={{'display':'none'}}>
              {MavsDashboard()}
            </div>
          </div>
        );
      case 'right':
        return (
          <div>
            <div style={{'display':'none'}}>
              {PinnedSubheaderList()}
            </div>
            <div style={{'display':'none'}}>
              {LiveGameUI()}
            </div>
            <div >
              {MavsDashboard()}
            </div>
          </div>
        );
      default:
        return (
          <div>
            <div style={{'display':'none'}} >
              {PinnedSubheaderList()}
            </div>
            <div  style={{'margin':'0 10vw'}}>
              {LiveGameUI()}
            </div>
            <div style={{'display':'none'}}>
              {MavsDashboard()}
            </div>
          </div>
        );
    }
  }
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
        <ToggleButtonGroup
            value={display}
            exclusive
            onChange={handleDisplay}
            aria-label="text alignment"
          >
            <ToggleButton sx = {{padding: '0 5px'}} value="left" >
            <p className='buttons'>Schedule</p>
            </ToggleButton>
            <ToggleButton sx = {{padding: '0 5px'}} value="live" >
            <p className='buttons'>Live Game</p>
            </ToggleButton>
            <ToggleButton sx = {{padding: '0 5px'}} value="right" >
            <p className='buttons'>Dashboard</p>
            </ToggleButton>
          </ToggleButtonGroup>
            {renderSelected()}
        </div>
      </div>
    </div>
  );
}


export default App;