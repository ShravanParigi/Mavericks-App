import * as React from 'react';
import gameData from './gameData.json';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import "./LiveGame.css"
import {GamePercentage, CircularProgressWithLabel, FetchImage, GenerateGamePanel, GenerateGamePanelTitle} from './ScheduleList.js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

export default function LiveGameUI(){
    const [openGame, setOpenGame] = React.useState(false);

    const handleClickOpenGame = (value) => {
        setOpenGame(true);
    };

    const handleCloseGame = () => {
        setOpenGame(false);
    };
    let game = FetchLiveGame();
    let homeTeam = FetchTeam(game.homeTeam);
    let awayTeam = FetchTeam(game.awayTeam);
    return (
        <div className='middle-display' >
            <div className='clock'>
                <CircularProgressWithLabel value={GamePercentage(game.timeEst)} word= {game.timeEst.substring(0,game.timeEst.indexOf(' ')) + " " + game.timeEst.substring(game.timeEst.lastIndexOf(' ') + 1)} size = '10vh' sizet = '2vh'/>
            </div>
            {TeamBoard(awayTeam,game.awayPts)}
            {TeamBoard(homeTeam,game.homePts)}
            <React.Fragment>
            <Button variant="contained" sx = {{'margin': '0 5px'}} onClick={handleClickOpenGame}>
            <p className = "buttonFont">
            More Info
            </p>
            </Button>
            <Dialog
            open={openGame}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseGame}
            fullWidth = {true}
            maxWidth = {'xl'}
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle>{GenerateGamePanelTitle(game.nbaGameId)}</DialogTitle>
            <DialogContent>
                <div>
                    {GenerateGamePanel(game.nbaGameId)}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseGame}>X</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
        </div>
    )
}

const FetchLiveGame = () => {
    const games = gameData.games;
    const game = games.filter((a) => a.gameStatus === 2)[0];
    return game;
}

const FetchTeam = (team) => {
    let i = 0;
    while(gameData.teamData[i].team !== team) {
        i = i + 1;
    }
    return gameData.teamData[i];
}

const TeamBoard = (team, points) => {
    return(
        <div className='team-board'>
            <div className='board-left'>
                {FetchImage(team.team)}
                <div className='team-info'>
                    <p style = {{'font-size': '2.5vh'}}>{team.team}</p>
                    <p style = {{'font-size': '5vh'}}>{team.teamName}</p>
                    <p style = {{'font-size': '2vh'}}>{FetchTeamData(team.team)}</p>
                </div>
            </div>
            <p style = {{'font-size': '10vh'}}>{points}</p>

        </div>
    );
}

const FetchTeamData = (team) => {
    const standings = gameData.standings;
    let i = 0;
    while(standings[i].teamAbbreviation !== team) {
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
    return teamData.wins + "-" + teamData.losses + ", " + place + " " + teamData.conference + "ern";
}