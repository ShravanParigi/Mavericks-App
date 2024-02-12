import * as React from 'react';
import './ScheduleList.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';
import gameData from './gameData.json';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Switch from '@mui/material/Switch';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';




export default function PinnedSubheaderList() {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: '100%',
        bgcolor: 'transparent',
        position: 'relative',
        overflow: 'auto',
        height: '55vh',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      <li>
        <ul>
          <ListSubheader
              sx={{
                  bgcolor: 'transparent',
                  'font-family': 'mavs_font, sans-serif',
                  'font-size': '1.5em',
                  'color': 'black'
              }}
          >{`Past Games`}</ListSubheader>
          {Games(3).map((item) => (
            <ListItem > 
              {GameButton(item) 
              /* <ListItemButton>
                <ListItemText primary={`Item ${item.date}`} />
              </ListItemButton> */}
            </ListItem>
          ))}
        </ul>
      </li>
      <li>
        <ul>
          <ListSubheader
              sx={{
                  bgcolor: 'transparent',
                  'font-family': 'mavs_font, sans-serif',
                  'font-size': '1.5em',
                  'color': '#18f23f',
                  'filter': 'drop-shadow(0px 0px 10px white)'
              }}
          >{`Live`}</ListSubheader>
          {Games(2).map((item) => (
            <ListItem > 
              {GameButton(item) 
              /* <ListItemButton>
                <ListItemText primary={`Item ${item.date}`} />
              </ListItemButton> */}
            </ListItem>
          ))}
        </ul>
      </li>
      <li>
        <ul>
          <ListSubheader
              sx={{
                  bgcolor: 'transparent',
                  'font-family': 'mavs_font, sans-serif',
                  'font-size': '1.5em',
                  'color': 'black',
              }}
          >{`Upcoming Games`}</ListSubheader>
          {Games(1).map((item) => (
            <ListItem > 
              {GameButton(item) 
              /* <ListItemButton>
                <ListItemText primary={`Item ${item.date}`} />
              </ListItemButton> */}
            </ListItem>
          ))}
        </ul>
      </li>
    </List>
  );
}


const Games = (num) => {
    const games = gameData.games;
    const sortedGames = [...games].sort((a, b) => a.date.localeCompare(b.date));
    const filteredGames = sortedGames.filter((a) => a.gameStatus === num);
    return filteredGames
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const GameButton = (game) => {
    const [openGame, setOpenGame] = React.useState(false);
    const [gameId, setgameId] = React.useState(0);

    const handleClickOpenGame = (value) => {
      setOpenGame(true);
      setgameId(value);
    };

    const handleCloseGame = () => {
        setOpenGame(false);
    };

    if (game.gameStatus === 3){
        return (
          <React.Fragment>
            <ListItemButton onClick={() => handleClickOpenGame(game.nbaGameId)}>
              <div className='gameButtonStyle'>
                    {/* <img src={'/images/logos/' + game.awayTeam + '.png'} alt={'altText'} /> */}
                    {FetchImage(game.awayTeam)}
                    {ScoreColor(game)}
                    {FetchImage(game.homeTeam)}
                    {/* <img src={'/images/logos/' + game.homeTeam + '.png'} alt={'altText'} /> */}
                    <p style = {{'font-size': '3vh'}}> {game.timeEst} {game.date.substr(5, 5).replace('-', '/')}</p>
              </div>
            </ListItemButton>
            <Dialog
            open={openGame}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseGame}
            fullWidth = {true}
            maxWidth = {'xl'}
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle>{GenerateGamePanelTitle(gameId)}</DialogTitle>
            <DialogContent>
                <div>
                    {GenerateGamePanel(gameId)}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseGame}>X</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
        );
      } else if (game.gameStatus === 2){
      return (
        <React.Fragment>
            <ListItemButton onClick={() => handleClickOpenGame(game.nbaGameId)}>
              <div className='gameButtonStyle'>
                    {FetchImage(game.awayTeam)}
                    <p style={{'white-space': 'nowrap'}} >{game.awayPts} - {game.homePts}</p>
                    {FetchImage(game.homeTeam)}
                    <CircularProgressWithLabel value={GamePercentage(game.timeEst)} word= {game.timeEst.substring(0,game.timeEst.indexOf(' ')) + " " + game.timeEst.substring(game.timeEst.lastIndexOf(' ') + 1)} size = '6vh' sizet = '1.1vh'/>
              </div>
            </ListItemButton>
            <Dialog
            open={openGame}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseGame}
            fullWidth = {true}
            maxWidth = {'xl'}
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle>{GenerateGamePanelTitle(gameId)}</DialogTitle>
            <DialogContent>
                <div>
                    {GenerateGamePanel(gameId)}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseGame}>X</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
        
      );
      } else {
      return (
        <React.Fragment>
            <ListItemButton onClick={() => handleClickOpenGame(game.nbaGameId)}>
              <div className='gameButtonStyle'>
                    {FetchImage(game.awayTeam)}
                    <p style={{'white-space': 'nowrap'}} >at</p>
                    {FetchImage(game.homeTeam)}
                    <p style = {{'font-size': '3vh'}}> {game.date.substr(5, 5).replace('-', '/')} at {game.timeEst.split(" ")[0]} </p>
              </div>
            </ListItemButton>
            <Dialog
            open={openGame}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseGame}
            fullWidth = {true}
            maxWidth = {'xl'}
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle>{GenerateGamePanelTitle(gameId)}</DialogTitle>
            <DialogContent>
                <div>
                    {GenerateGamePanel2(gameId)}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseGame}>X</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
      );
      }
}

export const GenerateGamePanelTitle = (gameId) => {
  const FetchTeam = (team) => {
    let i = 0;
    while(gameData.teamData[i].team !== team) {
        i = i + 1;
    }
    return gameData.teamData[i];
  };
  const games = gameData.games;
  const gameIndex = games.findIndex((game) => game.nbaGameId === gameId);

  // Check if the game was not found
  if (gameIndex === -1) {
    return 'Game not found';
  }
  const game = games[gameIndex];
  return FetchTeam(game.awayTeam).teamName + " vs. " + FetchTeam(game.homeTeam).teamName + " " + game.date.substring(5, 5).replace('-', '/');


}

export const GenerateGamePanel = (gameId) => {

  const [statChoice, setStatChoice] = React.useState('left');
  const [checked, setChecked] = React.useState(false);
  const [quarter, setQuarter] = React.useState(1);


  const games = gameData.games;

  // Find the game with the specified gameId
  const gameIndex = games.findIndex((game) => game.nbaGameId === gameId);

  // Check if the game was not found
  if (gameIndex === -1) {
    return <p>Game not found</p>;
  }

  const game = games[gameIndex];

  // Filter quarter points for the specific game
  const gameQP = gameData.quarterPoints.filter((qp) => qp.nbaGameId === gameId);

  // Create a dictionary for quarter points
  const QPDict = {};
  const gamePBP = {};
  for (let i = 1; i < 5; i++){
    QPDict[game.awayTeam + i] = "-";
    QPDict[game.homeTeam + i] = "-";
    gamePBP[i] = [];
  }
  for (const qp of gameQP) {
    QPDict[qp.team + qp.period] = qp.pts;
  }
  console.log(QPDict);

  const gamesPBP = [...gameData.gamePlayByPlay];
  for(let i = 0; i < gamesPBP.length; i++ ){
    if(gamesPBP[i].nbaGameId === gameId){
      let gamePBPunit = gamesPBP[i];
      gamePBPunit.description = gamePBPunit.description.replace("[", "").replace("]", " |").replace("(", " | ").replace(")", " | ").replace("|   |", "|");
      console.log(gamePBPunit);
      gamePBP[gamesPBP[i].period].push(gamePBPunit);
    }
  }
  const handleStatChoice = (event, newStatChoice) => {
    if (newStatChoice !== null){
      setStatChoice(newStatChoice);
    }
  };

  const handleColoring = () => {
    setChecked(!checked);
  }

  const handleQuarter = (event, newQChoice) => {
    if (newQChoice !== null){
      setQuarter(newQChoice);
    }
  };

  const renderSelected = () => {
    switch (statChoice) {
      case 'left':
        return <GenPBPTable pbp = {gamePBP} home = {game.homeTeam} away = {game.awayTeam} quarter={quarter} handleQuarter={handleQuarter} />
      case 'center':
        return <GenAwayStatsTable game = {game} checked={checked} handleColoring = {handleColoring}/>;
      case 'right':
        return <GenHomeStatsTable game = {game} checked={checked} handleColoring = {handleColoring} />;
      default:
        return null;
    }
  }
  
  return (
    <div>
    <div className='header'>
      <div style = {{ 'flex-direction': 'row' }}className='teamHeader'>
      {FetchImage(game.awayTeam)}
      <p>{game.awayPts}</p>
      </div>
      <div style={{'flex-direction':' row', 'display':'flex'}}>
        <div className='quarterPts'>
          <p>Team</p>
          <p>{game.awayTeam}</p>
          <p>{game.homeTeam}</p>
        </div>
        <div className='quarterPts'>
          <p>1st</p>
          <p>{QPDict[game.awayTeam + "1"]}</p>
          <p>{QPDict[game.homeTeam + "1"]}</p>
        </div>
        <div className='quarterPts'>
          <p>2nd</p>
          <p>{QPDict[game.awayTeam + "2"]}</p>
          <p>{QPDict[game.homeTeam + "2"]}</p>
        </div>
        <div className='quarterPts'>
          <p>3rd</p>
          <p>{QPDict[game.awayTeam + "3"]}</p>
          <p>{QPDict[game.homeTeam + "3"]}</p>
        </div>
        <div className='quarterPts'>
          <p>4th</p>
          <p>{QPDict[game.awayTeam + "4"]}</p>
          <p>{QPDict[game.homeTeam + "4"]}</p>
        </div>
        <div className='quarterPts'>
          <p>Total</p>
          <p>{game.awayPts}</p>
          <p>{game.homePts}</p>
        </div>
        {(game.gameStatus === 3) ? <p style = {{'font-size':'30px', 'margin':'auto 20px'}}>Final</p> : null}
        {(game.gameStatus === 2) ? (<CircularProgressWithLabel value={GamePercentage(game.timeEst)} word= {game.timeEst.substring(0,game.timeEst.indexOf(' ')) + " " + game.timeEst.substring(game.timeEst.lastIndexOf(' ') + 1)} size = '4vw' sizet = '0.75vw'/>) : null}
      </div>
      <div style = {{ 'flex-direction': 'row-reverse' }} className='teamHeader'>
      {FetchImage(game.homeTeam)}
      <p>{game.homePts}</p>
      </div>
    </div>
    <div>
    <ToggleButtonGroup
      value={statChoice}
      exclusive
      onChange={handleStatChoice}
      aria-label="text alignment"
    >
      <ToggleButton sx= {{padding: '0 5px'}} value="left" aria-label="left aligned">
      <p className='buttons'>Play-by-Play</p>
      </ToggleButton>
      <ToggleButton sx= {{padding: '0 5px'}} value="center" aria-label="centered">
      <p className='buttons'>{game.awayTeam + " Stats"}</p>
      </ToggleButton>
      <ToggleButton sx= {{padding: '0 5px'}} value="right" aria-label="right aligned">
      <p className='buttons'>{game.homeTeam + " Stats"}</p>
      </ToggleButton>
    </ToggleButtonGroup>
      {renderSelected()}
    </div>
    </div>
  );
};

export const GenerateGamePanel2 = (gameId) => {

  const games = gameData.games;

  // Find the game with the specified gameId
  const gameIndex = games.findIndex((game) => game.nbaGameId === gameId);

  // Check if the game was not found
  if (gameIndex === -1) {
    return <p>Game not found</p>;
  }

  const game = games[gameIndex];  
  return (
    <div>
    <div className='header'>
      <div style = {{ 'flex-direction': 'row' }}className='teamHeader'>
      {FetchImage(game.awayTeam)}
      </div>
      <div style={{'flex-direction':' row', 'display':'flex', 'font-size':'20px'}}>
      {'Game to be played on ' + game.date.substr(5,5).replace('-', '/')}
      </div>
      <div style = {{ 'flex-direction': 'row-reverse' }} className='teamHeader'>
      {FetchImage(game.homeTeam)}
      </div>
    </div>
    </div>
  );
};

const GenPBPTable = ({pbp,away,home,quarter,handleQuarter}) => {
    const columns = [
      { key: 'gameClock', label: 'TIME' },
      { key: 'description', label: 'PLAY' },
      { key: 'awayScore', label: away },
      { key: 'homeScore', label: home },
    ];

    return (
      
        <div className='pbpview'>
          <ToggleButtonGroup
            value={quarter}
            exclusive
            onChange={handleQuarter}
            aria-label="text alignment"
          >
            <ToggleButton sx = {{padding: '0 5px'}} value="1" >
            <p className='buttons'>1st</p>
            </ToggleButton>
            <ToggleButton sx = {{padding: '0 5px'}} value="2" >
            <p className='buttons'>2nd</p>
            </ToggleButton>
            <ToggleButton sx = {{padding: '0 5px'}} value="3" >
            <p className='buttons'>3rd</p>
            </ToggleButton>
            <ToggleButton sx = {{padding: '0 5px'}} value="4" >
            <p className='buttons'>4th</p>
            </ToggleButton>
          </ToggleButtonGroup>
          <div style={{ height: '55vh', overflowY: 'auto' }}>
          <PBPTable columns={columns} data={pbp[quarter]}/>
        </div>
      </div>
    );;
}

const PBPTable = ({columns, data}) => {
  
  return (
    <TableContainer sx = {{height : '100%'}} component={Paper}>
      <Table stickyHeader aria-label="sticky table" >
        <TableHead>
          <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  <p className='chartData'>
                    {column.label}
                  </p>
                    
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  <p className={(column.label === row.team && row.pts > 0) ? "chartData3" : 'chartData1'}>
                  {row[column.key]}
                  </p>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


const GenAwayStatsTable = ({game,checked,handleColoring}) => {
  const data = gameData.playerBoxScores;
    let playerData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].nbaGameId === game.nbaGameId && data[i].team === game.awayTeam){
            let dict = {};
            dict['name'] = data[i].name;
            dict['id'] = data[i].nbaId;
            dict['min'] = data[i].min;
            dict['fgp'] = data[i].fgm + "-" +data[i].fga;
            dict['tpp'] = data[i].tpm + "-" +data[i].tpa;
            dict['ftp'] = data[i].ftm + "-" +data[i].fta;
            dict['pts'] = data[i].pts;
            dict['oreb'] = data[i].oreb;
            dict['dreb'] = data[i].dreb;
            dict['reb'] = data[i].reb;
            dict['ast'] = data[i].ast;
            dict['stl'] = data[i].stl;
            dict['blk'] = data[i].blk;
            dict['tov'] = data[i].tov;
            dict['pf'] = data[i].pf;
            dict['plusMinus'] = data[i].plusMinus;
            dict['pos'] = data[i].startPos;
            playerData.push(dict);
        }
    }
    const columns = [
      { key: 'pos', label: 'POS' },
      { key: 'name', label: 'NAME' },
      { key: 'min', label: 'MINS' },
      { key: 'fgp', label: 'FG' },
      { key: 'tpp', label: '3PT' },
      { key: 'ftp', label: 'FT' },
      { key: 'pts', label: 'PTS' },
      { key: 'reb', label: 'REB' },
      { key: 'oreb', label: 'OREB' },
      { key: 'dreb', label: 'DREB' },
      { key: 'ast', label: 'AST' },
      { key: 'stl', label: 'STL' },
      { key: 'blk', label: 'BLK' },
      { key: 'tov', label: 'TOV' },
      { key: 'pf', label: 'PF' },
      { key: 'plusMinus', label: '+/-' },
    ];
    

    const playerStats = gameData.playerStats;
    let sznStats = {};
    for (let i = 0; i < playerStats.length; i++){
      if (playerStats[i].team === game.awayTeam){
        sznStats[playerStats[i].nbaId] =  {...playerStats[i]} ;
      }
    }

    return (
      <div style={{ height: '55vh', overflowY: 'auto' }}>
        <div className='slider'>
          <p>Compare to season Stats</p>
          <Switch
            checked={checked}
            onChange={handleColoring}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
        <ScoresTable columns={columns} data={playerData} sznStats={sznStats} checked={checked}/>
      </div>
    );;
}

const GenHomeStatsTable = ({game,checked,handleColoring}) => {
  const data = gameData.playerBoxScores;
    let playerData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].nbaGameId === game.nbaGameId && data[i].team === game.homeTeam){
            let dict = {};
            dict['name'] = data[i].name;
            dict['id'] = data[i].nbaId;
            dict['min'] = data[i].min;
            dict['fgp'] = data[i].fgm + "-" +data[i].fga;
            dict['tpp'] = data[i].tpm + "-" +data[i].tpa;
            dict['ftp'] = data[i].ftm + "-" +data[i].fta;
            dict['pts'] = data[i].pts;
            dict['oreb'] = data[i].oreb;
            dict['dreb'] = data[i].dreb;
            dict['reb'] = data[i].reb;
            dict['ast'] = data[i].ast;
            dict['stl'] = data[i].stl;
            dict['blk'] = data[i].blk;
            dict['tov'] = data[i].tov;
            dict['pf'] = data[i].pf;
            dict['plusMinus'] = data[i].plusMinus;
            dict['pos'] = data[i].startPos;
            playerData.push(dict);
        }
    }
    const columns = [
      { key: 'pos', label: 'POS' },
      { key: 'name', label: 'NAME' },
      { key: 'min', label: 'MINS' },
      { key: 'fgp', label: 'FG' },
      { key: 'tpp', label: '3PT' },
      { key: 'ftp', label: 'FT' },
      { key: 'pts', label: 'PTS' },
      { key: 'reb', label: 'REB' },
      { key: 'oreb', label: 'OREB' },
      { key: 'dreb', label: 'DREB' },
      { key: 'ast', label: 'AST' },
      { key: 'stl', label: 'STL' },
      { key: 'blk', label: 'BLK' },
      { key: 'tov', label: 'TOV' },
      { key: 'pf', label: 'PF' },
      { key: 'plusMinus', label: '+/-' },
  ];

  const playerStats = gameData.playerStats;
    let sznStats = {};
    for (let i = 0; i < playerStats.length; i++){
      if (playerStats[i].team === game.homeTeam){
        sznStats[playerStats[i].nbaId] =  {...playerStats[i]} ;
      }
    }

    return (
      <div style={{ height: '50vh', overflowY: 'auto' }}>
        <div className='slider'>
          <p>Compare to season Stats</p>
          <Switch
            checked={checked}
            onChange={handleColoring}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
        <ScoresTable columns={columns} data={playerData} sznStats={sznStats} checked={checked} />
      </div>
    );;
}


const ScoresTable = ({ columns, data, sznStats, checked }) => {
  const checkStat = (stat1,stat2,cat) => {
    console.log(stat1);
    console.log(stat2);
    if (!stat2){
      return "chartData1"
    }
    switch(cat){
      case 'min':
      case 'reb':
      case 'oreb':
      case 'dreb':
      case 'ast':
      case 'stl':
      case 'blk':
      case 'pts':
      case 'plusMinus':
        // console.log(stat1);
        // console.log((stat2[cat]/stat2['gp']));
        return  (stat1[cat] > (stat2[cat]/stat2['gp'])) ? 'chartData3' : 'chartData2';
      case 'tov':
      case 'pf':
        // console.log(stat1[cat]);
        // console.log((stat2[cat]/stat2['gp']));
        return (stat1[cat] < (stat2[cat]/stat2['gp'])) ? 'chartData3' : 'chartData2';
      default:
        console.log(stat1[cat]);
        let shot = stat1[cat].split("-")
        console.log(shot);
        console.log(stat2[cat]);
        return ((parseFloat(shot[0])/parseFloat(shot[1])) > stat2[cat] ) ? 'chartData3' : 'chartData2';
    }

  }
  return (
    <TableContainer sx = {{height : '100%'}} component={Paper}>
      <Table stickyHeader aria-label="sticky table" >
        <TableHead>
          <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  <p className='chartData'>
                    {column.label}
                  </p>
                    
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  <p className={ (column.key === "pos" || column.key === "name") ? 'chartData' : !checked ? 'chartData1' : (checkStat(row, sznStats[row.id],column.key))}>
                  {row[column.key]}
                  </p>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// function GamePanel() {
//   const [infoChoice, setInfoChoice] = React.useState('pergame');

//   const handleInfoChoice = (event, newTable) => {
//       if (newTable !== null) {
//         setInfoChoice(newTable);
//       }
//   };

//   const renderSelectedInfo = () => {
//       switch (infoChoice) {

//         default:
//           return null;
//       }
//     };

//   return (
//   <div className='popup'>      
//       <ToggleButtonGroup
//           value={infoChoice}
//           exclusive
//           onChange={handleInfoChoice}
//           >
//           <ToggleButton sx= {{padding: '0 5px'}} value="pergame" aria-label="left aligned">
//           <p className='buttons'>Per Game</p>
//           </ToggleButton>
//           <ToggleButton sx= {{padding: '0 5px'}} value="totals" aria-label="centered">
//           <p className='buttons'>Season Totals</p>  
//           </ToggleButton>
//           <ToggleButton sx= {{padding: '0 5px'}} value="splits" aria-label="right aligned">
//           <p className='buttons'>Shooting</p>
//           </ToggleButton>
//       </ToggleButtonGroup>
//     </div>
//   );
// }

export const FetchImage = (text) => {
  let i = 0;
  while(gameData.teamData[i].team !== text) {
    i = i + 1;
  }
  return (
    <img src={gameData.teamData[i].logo} alt={'altText'} />
  )
}

export const GamePercentage = (text) => {
  let num = text.split(" - ")[1].split(":")[0];
  if (text.substring(0,text.indexOf(' ')) === "1st"){
    return ((12 - num)/48)*100;
  } else if (text.substring(0,text.indexOf(' ')) === "2nd"){
    return ((24 - num)/48)*100;
  } else if (text.substring(0,text.indexOf(' ')) === "3rd"){
    return ((36 - num)/48)*100;
  } else if (text.substring(0,text.indexOf(' ')) === "4th"){
    return ((48 - num)/48)*100;
  }
  return 100;  
}

const ScoreColor = (game) => {
  let awayColor = "";
  let homeColor = "";
  if (game.homeTeam === "DAL"){
    awayColor = "black";
    if(game.homePts > game.awayPts){
      homeColor = "#18f23f";
    } else {
      homeColor = "red";
    }
  } else {
    homeColor = "black";
    if(game.homePts < game.awayPts){
      awayColor = "#18f23f";
    } else {
      awayColor = "red";
    }
  }
  return(
    <p style={{'white-space': 'nowrap'}} >
      <span style={{ color: awayColor }}>{game.awayPts}</span> - <span style={{ color: homeColor }}>{game.homePts}</span>
    </p>
  );
} 

export function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', 'margin-left': '0.7vw'}}>
      <CircularProgress size= {props.size}  variant="determinate" {...props} sx = {{color: 'green', 'filter': 'drop-shadow(0px 0px 10px white)'}} />
      <Box
        sx={{
          top: '2px',
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="green" sx={{'font-family': 'mavs_font, sans-serif', 'font-size': props.sizet, 'filter': 'drop-shadow(0px 0px 1px white)' }}>
          {props.word}
        </Typography>
      </Box>
    </Box>
  );
}
// // key={`item-${sectionId}-${item}`}>
