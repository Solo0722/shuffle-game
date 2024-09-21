import React, { useContext } from 'react'
import Landing from './Landing';
import GameModes from './GameModes';
import Game from './Game';
import { GlobalContext } from './context/GlobalContextProvider';

const Root = () => {
    
    const {phase} = useContext(GlobalContext)

     const getScreen = () => {
       switch (phase) {
         case 0:
           return <Landing />;
         case 1:
           return <GameModes />;
         case 2:
           return <Game />;
         default:
           return <Landing />;
       }
     };
  return <main className="app">{getScreen()}</main>;
}

export default Root