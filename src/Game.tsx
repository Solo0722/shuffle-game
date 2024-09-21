import gsap from 'gsap';
import React, { useContext, useEffect, useRef, useState } from 'react'
import BackButton from './BackButton';
import ReactConfetti from 'react-confetti';
import Board from './Board';
import { IMAGE, IMAGES, POS } from './constants';
import { GlobalContext } from './context/GlobalContextProvider';


const shuffleBoard = (board:IMAGE[][]) => {
  const images = [];

  for (let i = 0; i < board.length; ++i) {
    for (let j = 0; j < board[i].length; ++j) {
      images.push(board[i][j]);
    }
  }

  for (let i = 0; i < board.length; ++i) {
    for (let j = 0; j < board[i].length; ++j) {
      if (
        (i === 0 || i === board.length - 1) &&
        (j === 0 || j === board[i].length - 1)
      )
        continue;
      const randomIndex = Math.floor(Math.random() * images.length);
      board[i][j] = images[randomIndex];
      images.splice(randomIndex, 1); // Remove the used image from the array
    }
  }
  return board;
};

const correctImages = (flattenedBoard: IMAGE[]) => {
  for (let i = 0; i < flattenedBoard.length - 1; i++) {
    const currentShade = parseInt(flattenedBoard[i].id);
    const nextShade = parseInt(flattenedBoard[i + 1].id);
    if (currentShade > nextShade) {
      return false;
    }
  }
  return true;
};

const genBoard = (
  level: string,
  correctBoard: React.MutableRefObject<IMAGE[][]>,
  W: number | undefined,
  H: number | undefined,
  iter = 1
) => {
  const board: IMAGE[][] = [];

  for (let i = 0; i < W; ++i) {
    board.push([]);
    for (let j = 0; j < H; ++j) {
      const index = i * H + j;
      board[i].push(IMAGES[level][index]);
    }
  }

  if (!correctImages([].concat(...board)) && iter < 100) {
    return genBoard(level, correctBoard, W, H, iter + 1);
  } else {
    correctBoard.current = board;
  }

  return shuffleBoard(JSON.parse(JSON.stringify(correctBoard.current)));
};



const Game = () => {
  const [shuffled, setShuffled] = useState(false);
  const {level} = useContext(GlobalContext);
   const [score, setScore] = useState(0);
  const gameBoardRef = useRef(null);
  const cardsRef = useRef([]);
  const popUpRef = useRef(null);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [confetti, setConfetti] = useState(false);
   const correctBoard = React.useRef<IMAGE[][]>();
   const [{ W, H }] = React.useState({ W: 4, H: 4 });
   const [board, setBoard] = React.useState(() => genBoard(level,correctBoard, W, H));
   React.useEffect(() => {
     setBoard(genBoard(level,correctBoard, W, H));
   }, [W, H, level]);
  const [counter, setCounter] = React.useState(0);
  
  const checkWin = (
    board: IMAGE[][],
    correctBoard: React.MutableRefObject<IMAGE[][]>,
  ) => {
    setScore(0);
    for (let i = 0; i < board.length; ++i) {
      for (let j = 0; j < board[i].length; ++j) {
        if (board[i][j].id === correctBoard.current[i][j].id) {
          setScore((sc) => (sc += 6.25));
        }
      }
    }
   setShowScorePopup(true);
   if (score >= 100) {
     setConfetti(true);
     setTimeout(() => setConfetti(false), 7000);
   }
  };

    const generateMessage = (score: number) => {
      if (score < 30) {
        return "Ooops, you didn't do well. Try again!";
      } else if (score < 50) {
        return "Better! Now let's aim for a higher score";
      } else if (score < 70) {
        return "Ohhhhh, So close! You can do it";
      } else {
        return "Yayyyyy! You did it. Well done";
      }
    };

   const swap = (a: POS, b: POS) => {
     setCounter((c) => c + 1);
     setBoard((board_old: IMAGE[][]) => {
       const board = JSON.parse(JSON.stringify(board_old));
       const helper = board[a.x][a.y];
       board[a.x][a.y] = board[b.x][b.y];
       board[b.x][b.y] = helper;
       return board;
     });
   };

  //  const solve = () => {
  //    setBoard(correctBoard.current);
  //  };


   useEffect(() => {
       gsap.fromTo(
         cardsRef.current,
         { x: 0, y: 0, opacity: 0 },
         {
          //  x: (i) => (Math.random() - 0.5) * 200,
          //  y: (i) => (Math.random() - 0.5) * 200,
           opacity: 1,
           duration: 0.5,
           stagger: 0.05,
           onComplete: () => {
             setShuffled(true);
             shuffleComplete();
           },
         }
       );
   }, []);
  
   const shuffleComplete = () => {
     setShuffled(true); // Shuffle complete, show "Begin" message
     gsap.fromTo(
       popUpRef.current,
       { scale: 0, opacity: 0 },
       {
         scale: 1,
         opacity: 1,
         duration: 1,
         ease: "bounce.out",
         onComplete: bounceOut,
       }
     );
  };

  const bounceOut = () => {
    gsap.to(popUpRef.current, {
      scale: 1.2,
      duration: 0.5,
      ease: "bounce.out",
      onComplete: () => {
        gsap.to(popUpRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          onComplete: () => setShuffled(false), // Reset for future clicks
        });
      },
    });
  };

  const finishGame = () => {
    checkWin(board, correctBoard);
  };



  
  return (
    <div className="game-container">
      <BackButton />
      <Header level={level} counter={counter} />
      <div className="game-board" ref={gameBoardRef}>
        <div className="pop-up" ref={popUpRef}>
          Begin
        </div>
        <Board
          cardsRef={cardsRef}
          board={board}
          correctBoard={correctBoard.current as IMAGE[][]}
          swap={swap}
        />
      </div>
      <div className="button-container">
        <button className="action-button" onClick={() => shuffleBoard(board)}>
          Reshuffle Cards
        </button>
        <button className="action-button" onClick={finishGame}>
          Finish Game
        </button>
      </div>
      <div className="overlay"
        onClick={() => setShowScorePopup(false)}
        style={{ display: showScorePopup ? "flex" : "none" }}
      />
      {showScorePopup && (
        <div className="score-popup">
          <h3 className="font-bold text-xl">Your Score: {score}</h3>
          <p>{generateMessage(score)}</p>
        </div>
      )}
      {confetti && <ReactConfetti />}
    </div>
  );
}

const Header = ({ level, counter }:{level:string,counter:number}) => {
  return (
    <div className="header">
      <div className="header-item">Level: {level}</div>
      {/* <div className="header-item">Score: {score}</div> */}
      <div className="header-item">Steps: {counter}</div>
    </div>
  );
};

export default Game