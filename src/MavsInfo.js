import * as React from 'react';
import gameData from './gameData.json';
import "./MavsInfo.css"
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { color } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

export default function MavsDashboard() {

    const [openPS, setOpenPS] = React.useState(false);
    const [openNS, setOpenNS] = React.useState(false);
    const [openSR, setOpenSR] = React.useState(false);

  
    const handleClickOpenPS = () => {
        setOpenPS(true);
    };

    const handleClickOpenNS = () => {
        setOpenNS(true);
    };

    const handleClickOpenSR = () => {
        setOpenSR(true);
    };
  
    
  
    const handleClosePS = () => {
        setOpenPS(false);
    };

    const handleCloseNS = () => {
        setOpenNS(false);
    };

    const handleCloseSR = () => {
        setOpenSR(false);
    };

    return(
        <div>
            <p>Season Leaders</p>
            {SeasonLeadersBoard()}
            {GenerateMavsLine()}
            <React.Fragment>
                <Button variant="contained" sx = {{'margin': '0 5px'}} onClick={handleClickOpenPS}>
                <p className = "buttonFont">
                Player Stats
                </p>
                </Button>
                <Dialog
                open={openPS}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClosePS}
                fullWidth = {true}
                maxWidth = {'xl'}
                aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle>{"Mavericks Player Statistics"}</DialogTitle>
                <DialogContent>
                    <div>
                        {PlayerStatistics()}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePS}>
                        X
                    </Button>
                </DialogActions>
                </Dialog>
            </React.Fragment>
            <React.Fragment>
                <Button variant="contained"  sx = {{'margin': '0 5px'}} onClick={handleClickOpenNS}>
                <p className = "buttonFont">
                NBA Standings
                </p>
                </Button>
                <Dialog
                open={openNS}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseNS}
                fullWidth = {true}
                maxWidth = {'xl'}
                aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle>{"NBA Standings"}</DialogTitle>
                <DialogContent>
                    <div>
                        {NbaStandingsTable()}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNS}>X</Button>
                </DialogActions>
                </Dialog>
            </React.Fragment>
            <React.Fragment>
                <Button variant="contained" sx = {{'margin': '0 5px'}} onClick={handleClickOpenSR}>
                <p className = "buttonFont">
                Scouting Reports
                </p>
                </Button>
                <Dialog
                open={openSR}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseSR}
                fullWidth = {true}
                maxWidth = {'xl'}
                aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle>{"Scouting Reports"}</DialogTitle>
                <DialogContent>
                    <div>
                        {Reports()}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSR}>
                        X
                    </Button>
                </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
        
    );
}

const Reports = () => {
  const [reports, setReports] = React.useState([...gameData.scoutingReports]);
  const [formData, setFormData] = React.useState({
    nbaGameId: '',
    scout: '',
    nbaId: '',
    name: '',
    report: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data if needed

    // Add the form data to the list of reports
    setReports((prevReports) => [...prevReports, formData]);

    // Reset form data
    setFormData({
      nbaGameId: '',
      scout: '',
      nbaId: '',
      name: '',
      report: ''
    });
  };
  const columns = [
    { key: 'nbaGameId', label: 'nba Game Id' },
    { key: 'scout', label: 'scout' },
    { key: 'nbaId', label: 'nba Id' },
    { key: 'name', label: 'name' },
    { key: 'report', label: 'report' }
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='reportfiller'>
        <label>
          NBA Game ID:
          <input style = {{'margin':'0 20px 0 10px'}} type="text" name="nbaGameId" value={formData.nbaGameId} onChange={handleChange} required/>
        </label>
        <br />
        <label>
          Scout:
          <input style = {{'margin':'20px'}} type="text" name="scout" value={formData.scout} onChange={handleChange} required/>
        </label>
        <br />
        <label>
          NBA ID:
          <input style = {{'margin':'20px'}} type="text" name="nbaId" value={formData.nbaId} onChange={handleChange} required/>
        </label>
        <br />
        <label>
          Name:
          <input style = {{'margin':'20px'}} type="text" name="name" value={formData.name} onChange={handleChange} required/>
        </label>
        <br />
        <label>
          Report:
          <textarea name="report" value={formData.report} onChange={handleChange} required/>
        </label>
        <Button type="submit" variant="contained" sx = {{'margin': '0 5px'}}>
                Submit
                </Button>
        </div>
      </form>

      <div>
        <h2 style = {{'margin':'0'}}>List of Reports:</h2>
        <div style={{ overflowY: 'auto' }}>
        <TableContainer sx = {{height : '75%'}} component={Paper}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  <p className='chartData1'>{column.label}</p>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((row) => (
              <TableRow key={row.name}>
                {columns.map((column) => (
                  <TableCell sx = {{'font-family': 'mavs-font,sans-serif'}} key={column.key}>
                    <p className='chartData1'>{row[column.key]}</p></TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      </div>
    </div>
  );
};


const GenerateMavsLine = () => {
    const standings = gameData.standings;
    let i = 0;
    while(standings[i].teamAbbreviation != 'DAL') {
        i = i + 1;
    }
    let teamData = standings[i];
    let place = "";
    switch(teamData.playoffRank){
        case 1:
            place = "1st";
            break;
        case 2:
            place = "2nd";
            break;
        case 3:
            place = "3rd";
            break;
        default:
            place = teamData.playoffRank + "th";
    }
    return (
        <div className='headline'>
        <p>{"Mavs stand at " + place + " in West " + "with a record of " + teamData.wins + " - " + teamData.losses}</p> 
        </div>
    );
}

const SeasonLeadersBoard = () => {
    const data = GeneratePerGame();
    const ptsLeader = [...data].sort((a, b) => b.pts - a.pts)[0];
    const astLeader = [...data].sort((a, b) => b.ast - a.ast)[0];
    const rbsLeader = [...data].sort((a, b) => b.reb - a.reb)[0];
    const stlLeader = [...data].sort((a, b) => b.stl - a.stl)[0];
    const blkLeader = [...data].sort((a, b) => b.blk - a.blk)[0];
    


    return(
        <div>
            <div className = "rowSL">
                {LeaderPanel('Points',ptsLeader.pict,ptsLeader.pts,ptsLeader.name)}
                {LeaderPanel('Rebounds',rbsLeader.pict,rbsLeader.reb,rbsLeader.name)}
                
            </div>
            <div className = "rowSL">
                {LeaderPanel('Assists',astLeader.pict,astLeader.ast,astLeader.name)}
                {LeaderPanel('Steals',stlLeader.pict,stlLeader.stl,stlLeader.name)}
                {LeaderPanel('Blocks',blkLeader.pict,blkLeader.blk,blkLeader.name)}
            </div>
        </div>
    );
}


const LeaderPanel = (cat,image,num,name) => {
    return (
        <div>
            <p>{cat}</p>
            <div className='headSL'>
                <img src = {image} />
                <p>{num}</p>
            </div>
            <p style={{color: 'white', 'margin-top':'1vh'}}>{name}</p>
        </div>
    );
}

function NbaStandingsTable() {
    const [tableChoice, setTableChoice] = React.useState('West');
  
    const handleTableChoice = (event, newTable) => {
        if (newTable !== null) {
            setTableChoice(newTable);
        }
    };

    const renderSelectedTable = () => {
        switch (tableChoice) {
          case 'West':
            return ;
          case 'East':
            return <TotalsTable />;
          case 'League':
            return <ShootingTable />;
          default:
            return null;
        }
      };
  
    return (
    <div className='popup'>      
        <ToggleButtonGroup
            value={tableChoice}
            exclusive
            onChange={handleTableChoice}
            >
            <ToggleButton sx= {{padding: '0 5px'}} value="West" aria-label="left aligned">
            <p className='buttons'>Western Conference</p>
            </ToggleButton>
            <ToggleButton sx= {{padding: '0 5px'}} value="East" aria-label="centered">
            <p className='buttons'>Eastern Conference</p>  
            </ToggleButton>
            <ToggleButton sx= {{padding: '0 5px'}} value="League" aria-label="right aligned">
            <p className='buttons'>Full League</p>
            </ToggleButton>
        </ToggleButtonGroup>
        <LeagueTable conf = {tableChoice} />
      </div>

    );
  }



function PlayerStatistics() {
    const [tableChoice, setTableChoice] = React.useState('pergame');
  
    const handleTableChoice = (event, newTable) => {
        if (newTable !== null) {
            setTableChoice(newTable);
        }
    };

    const renderSelectedTable = () => {
        switch (tableChoice) {
          case 'pergame':
            return <PerGameTable />;
          case 'totals':
            return <TotalsTable />;
          case 'splits':
            return <ShootingTable />;
          default:
            return null;
        }
      };
  
    return (
    <div className='popup'>      
        <ToggleButtonGroup
            value={tableChoice}
            exclusive
            onChange={handleTableChoice}
            >
            <ToggleButton sx= {{padding: '0 5px'}} value="pergame" aria-label="left aligned">
            <p className='buttons'>Per Game</p>
            </ToggleButton>
            <ToggleButton sx= {{padding: '0 5px'}} value="totals" aria-label="centered">
            <p className='buttons'>Season Totals</p>  
            </ToggleButton>
            <ToggleButton sx= {{padding: '0 5px'}} value="splits" aria-label="right aligned">
            <p className='buttons'>Shooting</p>
            </ToggleButton>
        </ToggleButtonGroup>
        {renderSelectedTable()}
      </div>

    );
  }


const GenerateStandings = (conf) => {
    const data = gameData.standings;
    let league = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].conference == conf || conf == "League"){
            let dict = {};
            dict['teamAbbreviation'] = data[i].teamAbbreviation;
            dict['wins'] = data[i].wins;
            dict['losses'] = data[i].losses;
            dict['playoffRank'] = data[i].playoffRank;
            dict['winPct'] = (data[i].winPct).toFixed(3);
            dict['conferenceGamesBack'] = data[i].conferenceGamesBack;
            dict['division'] = data[i].division;
            league.push(dict);
        }
    }
    const sortedteams = [...league].sort((a, b) => b.playoffRank - a.playoffRank);
    return sortedteams;
}

const LeagueTable = ({conf}) => {
    // Assuming you have some playerData
    const league = GenerateStandings(conf);
  
    const columns = [
      { key: 'playoffRank', label: 'Rank' },
      { key: 'teamAbbreviation', label: 'Team' },
      { key: 'wins', label: 'Wins' },
      { key: 'losses', label: 'Losses' },
      { key: 'winPct', label: '%' },
      { key: 'division', label: 'Division' },
      { key: 'conferenceGamesBack', label: 'Games Behind' }
    ];
  
    return (
      <div style={{ height: '65vh', overflowY: 'auto' }}>
        <SortableTable2 columns={columns} data={league} />
      </div>
    );
  };

  const SortableTable2 = ({ columns, data }) => {
    const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });
  
    const handleSort = (key) => {
      const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
      setSortConfig({ key, direction });
    };
  
    const sortedData = React.useMemo(() => {
      if (sortConfig.key && sortConfig.key != 'division') {
        return [...data].sort((a, b) => {
            const valueA = parseFloat(a[sortConfig.key]);
            const valueB = parseFloat(b[sortConfig.key]);
      
            if (valueA < valueB) {
              return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
              return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
      } else if (sortConfig.key == 'division') {
        return [...data].sort((a, b) => {
      
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
      }
      return data;
    }, [data, sortConfig]);
  
    return (
      <TableContainer sx = {{height : '100%'}} component={Paper}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  <TableSortLabel
                    active={sortConfig.key === column.key}
                    direction={sortConfig.key === column.key ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort(column.key)}
                  >
                    <p className='chartData'>{column.label}</p>
                    
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.name}>
                {columns.map((column) => (
                  <TableCell sx = {{'font-family': 'mavs-font,sans-serif'}} key={column.key}>
                    <p className='chartData1'>{row[column.key]}</p></TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };


const GeneratePerGame = () => {
    const data = gameData.playerStats;
    let playerData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].team == 'DAL'){
            let dict = {};
            dict['name'] = data[i].name;
            dict['pict'] = data[i].photoUrl;
            dict['gp'] = data[i].gp;
            dict['gs'] = data[i].gs;
            dict['min'] = (data[i].min/data[i].gp).toFixed(1);
            dict['pts'] = (data[i].pts/data[i].gp).toFixed(1);
            dict['oreb'] = (data[i].oreb/data[i].gp).toFixed(1);
            dict['dreb'] = (data[i].dreb/data[i].gp).toFixed(1);
            dict['reb'] = (data[i].reb/data[i].gp).toFixed(1);
            dict['ast'] = (data[i].ast/data[i].gp).toFixed(1);
            dict['stl'] = (data[i].stl/data[i].gp).toFixed(1);
            dict['blk'] = (data[i].blk/data[i].gp).toFixed(1);
            dict['tov'] = (data[i].tov/data[i].gp).toFixed(1);
            dict['pf'] = (data[i].pf/data[i].gp).toFixed(1);
            dict['plusMinus'] = (data[i].plusMinus/data[i].gp).toFixed(1);
            playerData.push(dict);
        }
    }
    const sortedplayers = [...playerData].sort((a, b) => b.pts - a.pts);
    return sortedplayers;
}

  const GenerateTotals = () => {
    const data = gameData.playerStats;
    let playerData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].team == 'DAL'){
            let dict = {};
            dict['name'] = data[i].name;
            dict['pict'] = data[i].photoUrl;
            dict['gp'] = data[i].gp;
            dict['gs'] = data[i].gs;
            dict['min'] = data[i].min;
            dict['pts'] = data[i].pts;
            dict['reb'] = data[i].reb;
            dict['oreb'] = data[i].oreb;
            dict['dreb'] = data[i].dreb;
            dict['ast'] = data[i].ast;
            dict['stl'] = data[i].stl;
            dict['blk'] = data[i].blk;
            dict['tov'] = data[i].tov;
            dict['pf'] = data[i].pf;
            dict['plusMinus'] = data[i].plusMinus;
            playerData.push(dict);
        }
    }
    const sortedplayers = [...playerData].sort((a, b) => b.pts - a.pts);
    return sortedplayers;
}

const GenerateShootingSplits = () => {
    const data = gameData.playerStats;
    let playerData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].team == 'DAL'){
            let dict = {};
            dict['name'] = data[i].name;
            dict['pict'] = data[i].photoUrl;
            dict['gp'] = data[i].gp;
            dict['fgm'] = data[i].fgm;
            dict['fga'] = data[i].fga;
            dict['fgp'] = data[i].fgp ? (data[i].fgp * 100).toFixed(1) : (0).toFixed(1);
            dict['tpm'] = data[i].tpm;
            dict['tpa'] = data[i].tpa;
            dict['tpp'] = data[i].tpp ? (data[i].tpp * 100).toFixed(1) : (0).toFixed(1);
            dict['ftm'] = data[i].ftm;
            dict['fta'] = data[i].fta;
            dict['ftp'] = data[i].ftp ? (data[i].ftp * 100).toFixed(1) : (0).toFixed(1);
            dict['pts'] = data[i].pts;
            playerData.push(dict);
        }
    }
    const sortedplayers = [...playerData].sort((a, b) => b.fgp - a.fgp);
    return sortedplayers;
}




const SortableTable = ({ columns, data }) => {
    const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });
  
    const handleSort = (key) => {
      const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
      setSortConfig({ key, direction });
    };
  
    const sortedData = React.useMemo(() => {
      if (sortConfig.key) {
        return [...data].sort((a, b) => {
            const valueA = parseFloat(a[sortConfig.key]);
            const valueB = parseFloat(b[sortConfig.key]);
      
            if (valueA < valueB) {
              return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
              return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
      }
      return data;
    }, [data, sortConfig]);
  
    return (
      <TableContainer sx = {{height : '100%'}} component={Paper}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
                <TableCell key={'name'} style={{ minWidth: '5px', padding: '8px', textAlign: 'center' }}>
                <p className='chartData'>
                {"Player Name"}
                </p>
                </TableCell>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  <TableSortLabel
                    active={sortConfig.key === column.key}
                    direction={sortConfig.key === column.key ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort(column.key)}
                  >
                    <p className='chartData'>
                    {column.label}
                    </p>
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.name}>
                
                <TableCell key={'name'}>
                    <div  style = {{display: 'flex', 'flex-direction': 'row', 'align-items': 'center'}}>
                        <img className="tablePhoto" src={row.pict}/>
                        
                        <p className='chartData'style={{ margin: '0'}}>{row['name']}</p>
                    </div>
                </TableCell>
                {columns.map((column) => (
                  <TableCell sx = {{'font-family': 'mavs-font,sans-serif'}} key={column.key}>
                    <p className='chartData1'>
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
  
  const PerGameTable = () => {
    // Assuming you have some playerData
    const playerData = GeneratePerGame();
  
    const columns = [
        { key: 'gp', label: 'GP' },
        { key: 'gs', label: 'GS' },
        { key: 'min', label: 'MINS' },
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
  
    return (
      <div style={{ height: '65vh', overflowY: 'auto' }}>
        <SortableTable columns={columns} data={playerData} />
      </div>
    );
  };
  
  const TotalsTable = () => {
    // Assuming you have some playerData
    const playerData = GenerateTotals();
  
    const columns = [
      { key: 'gp', label: 'GP' },
      { key: 'gs', label: 'GS' },
      { key: 'min', label: 'MINS' },
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
  
    return (
      <div style={{ height: '65vh', overflowY: 'auto' }}>
        <SortableTable columns={columns} data={playerData} />
      </div>
    );
  };

  const ShootingTable = () => {
    // Assuming you have some playerData
    const playerData = GenerateShootingSplits();
  
    const columns = [
      { key: 'gp', label: 'GP' },
      { key: 'fgm', label: 'FGM' },
      { key: 'fga', label: 'FGA' },
      { key: 'fgp', label: 'FG%' },
      { key: 'tpm', label: '3PM' },
      { key: 'tpa', label: '3PM' },
      { key: 'tpp', label: '3FG%' },
      { key: 'ftm', label: 'FTM' },
      { key: 'fta', label: 'FTA' },
      { key: 'ftp', label: 'FT%' },
      { key: 'pts', label: 'PTS' },
    ];
  
    return (
      <div style={{ height: '65vh', overflowY: 'auto' }}>
        <SortableTable columns={columns} data={playerData} />
      </div>
    );
  };


  

// const TotalsTable = () => {
//     const playerData = GenerateTotals();
//     return (
//         <div style={{ height: '65vh', overflowY: 'auto', bgcolor: 'transparent' }}>
//         <TableContainer component={Paper} sx={{ bgcolor: 'transparent'}}>
//           <Table stickyHeader sx={{ minWidth: '80%', bgcolor: 'transparent' }} size="small" aria-label="a dense table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Player</TableCell>
//                 <TableCell align="right">Gp</TableCell>
//                 <TableCell align="right">Gs</TableCell>
//                 <TableCell align="right">Mins</TableCell>
//                 <TableCell align="right">Pts</TableCell>
//                 <TableCell align="right">Reb&nbsp;(O,D)</TableCell>
//                 <TableCell align="right">Ast</TableCell>
//                 <TableCell align="right">Stl</TableCell>
//                 <TableCell align="right">Blk</TableCell>
//                 <TableCell align="right">Tov</TableCell>
//                 <TableCell align="right">Pf</TableCell>
//                 <TableCell align="right">+/-</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {playerData.map((row) => (
//                 <TableRow
//                   key={row.name}
//                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                 >
//                   <TableCell component="th" scope="row">
//                     <img className="tablePhoto" src={row.pict}/>
//                     {row.name}
//                   </TableCell>
//                   <TableCell align="right">{row.gp}</TableCell>
//                   <TableCell align="right">{row.gs}</TableCell>
//                   <TableCell align="right">{row.min}</TableCell>
//                   <TableCell align="right">{row.pts}</TableCell>
//                   <TableCell align="right">{row.reb}({row.oreb},{row.dreb})</TableCell>
//                   <TableCell align="right">{row.ast}</TableCell>
//                   <TableCell align="right">{row.stl}</TableCell>
//                   <TableCell align="right">{row.blk}</TableCell>
//                   <TableCell align="right">{row.tov}</TableCell>
//                   <TableCell align="right">{row.pf}</TableCell>
//                   <TableCell align="right">{row.plusMinus}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
      
//     );
//   }

// const PerGameTable = () => {
//     const playerData = GeneratePerGame();
//     return (
//         <div style={{ height: '65vh', overflowY: 'auto', bgcolor: 'transparent' }}>
//         <TableContainer component={Paper} sx={{ bgcolor: 'white', maxHeight: '100%', width: '100%'}}>
//           <Table stickyHeader sx={{ minWidth: '80%', bgcolor: 'white' }} size="small" aria-label="a dense table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Player</TableCell>
//                 <TableCell align="right">Gp</TableCell>
//                 <TableCell align="right">Gs</TableCell>
//                 <TableCell align="right">Mins</TableCell>
//                 <TableCell align="right">Pts</TableCell>
//                 <TableCell align="right">Reb&nbsp;(Off,Def)</TableCell>
//                 <TableCell align="right">Ast</TableCell>
//                 <TableCell align="right">Stl</TableCell>
//                 <TableCell align="right">Blk</TableCell>
//                 <TableCell align="right">Tov</TableCell>
//                 <TableCell align="right">Pf</TableCell>
//                 <TableCell align="right">+/-</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {playerData.map((row) => (
//                 <TableRow
//                   key={row.name}
//                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                 >
//                   <TableCell component="th" scope="row">
//                     <img className="tablePhoto" src={row.pict}/>
//                     {row.name}
//                   </TableCell>
//                   <TableCell align="right">{row.gp}</TableCell>
//                   <TableCell align="right">{row.gs}</TableCell>
//                   <TableCell align="right">{row.min.toFixed(1)}</TableCell>
//                   <TableCell align="right">{row.pts.toFixed(1)}</TableCell>
//                   <TableCell align="right">{row.reb.toFixed(1)} ({row.oreb.toFixed(1)}, {row.dreb.toFixed(1)})</TableCell>
//                   <TableCell align="right">{row.ast.toFixed(1)}</TableCell>
//                   <TableCell align="right">{row.stl.toFixed(1)}</TableCell>
//                   <TableCell align="right">{row.blk.toFixed(1)}</TableCell>
//                   <TableCell align="right">{row.tov.toFixed(1)}</TableCell>
//                   <TableCell align="right">{row.pf.toFixed(1)}</TableCell>
//                   <TableCell align="right">{row.plusMinus.toFixed(1)}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
      
//     );
//   }