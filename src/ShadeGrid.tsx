// src/ShadeGrid.tsx
import React, { useState, useEffect,useRef } from "react";
import { shades } from "./shades";
import ShadeItem from "./ShadeItem";
import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "./assets/confetti.json";

interface Shade {
  id: number;
  url: string;
}

const ShadeGrid: React.FC = () => {
  const [shuffledShades, setShuffledShades] = useState<Shade[]>([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [showGameRules, setShowGameRules] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const confettiRef = useRef<Lottie>(null);
  
  useEffect(() => {
    resetGame();
  }, []);


  const moveShade = (fromIndex: number, toIndex: number) => {
    const updatedShades = [...shuffledShades];
    const [movedShade] = updatedShades.splice(fromIndex, 1);
    updatedShades.splice(toIndex, 0, movedShade);
    setShuffledShades(updatedShades);
  };

  const checkOrder = (arrangedShades: Shade[]) => {
    let score = 0;
    for (let i = 0; i < arrangedShades.length; i++){
      if (shades[i].id === arrangedShades[i].id && shades[i].url === arrangedShades[i].url) {
        score += 5;
        if (score === 80) {
          setIsVisible(true);
        }
      }
    }
    return score;
  };

  const displayScore = (score:number) => {
    setShowScore(true);
    setScore(score);
  }


  const resetGame = () => {
    const shuffled = [...shades].sort(() => Math.random() - 0.5);
    setShuffledShades(shuffled);
  };

  const generateMessage = (score:number) => {
    if (score < 30) {
      return "Ooops, you didn't do well. Try again!"
    }
    else if (score < 50) {
      return "Better! Now let's aim for a higher score"
    }
    else if (score < 70) {
      return "Ohhhhh, So close! You can do it"
    }
    else {
      return "Yayyyyy! You did it. Well done"
    }
  }

  return (
    <DndProvider backend={TouchBackend}>
      <Container>
        <HeaderContainer>
          <h1>Akesi's Kreation Game</h1>
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Button onClick={resetGame}>Reset Game</Button>
            <Button style={{backgroundColor: "green"}} onClick={() => displayScore(checkOrder(shuffledShades))}>
              Finish Game
            </Button>
          </div>
        </HeaderContainer>
        <Grid>
          {shuffledShades.map((shade, index) => (
            <ShadeItem
              key={shade.id}
              index={index}
              shade={shade}
              moveShade={moveShade}
            />
          ))}
        </Grid>
        <ScoreContainer className={showScore ? "animates" : ""}>
          <h1 className="font-bold">Your Score</h1>
          <h1 className="font-semibold">{score}/100</h1>
          <p>{generateMessage(score)}</p>
        </ScoreContainer>
        <ScoreContainer className={showGameRules ? "animates" : ""}>
          <h1 className="font-bold">LET'S PLAY!</h1>
          <h1 className="font-semibold">
            Arrange the colors from lightest to darkest.
          </h1>
        </ScoreContainer>
      </Container>
      <Overlay
        onClick={() => {
          setShowScore(false);
          setIsVisible(false);
        }}
        style={{ display: showScore ? "flex" : "none" }}
      ></Overlay>
      <Overlay
        onClick={() => setShowGameRules(false)}
        style={{ display: showGameRules ? "flex" : "none" }}
      ></Overlay>
      {isVisible && (
      <Lottie
        ref={confettiRef}
        options={{
          autoplay: true,
          loop: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          pointerEvents: "none",
        }}
      />
      )}
    </DndProvider>
  );
};

const Container = styled.div`
  text-align: center;
  padding: 0 10px;
  position: relative;

  & .animates {
    display: block;
    animation: fadeIn 0.5s forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  @media screen and (max-width: 486px) {
    & {
      padding: 0 5px;
    }
  }
`;

const Overlay = styled.div`
position:fixed;
top:0;
left:0;
width:100vw;
height:100vh;
background-color:rgba(0,0,0,0.5);
/* display:flex; */
justify-content:center;
align-items:center;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  @media screen and (max-width: 486px) {
    & {
      flex-direction:column;
      justify-content:center;
      align-items:center;
    }

    & h1{
      margin-bottom:10px;
    }
  }
`;


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0px;
  margin-top: 20px;
  justify-content: center;
  border-radius:30px;

  @media screen and (max-width: 486px) {
    &{
      grid-template-columns: repeat(3, 1fr);
      gap:5px;
    }
  }
`;

const Button = styled.button`
  padding:10px 20px;
  border-radius:10px;
  background-color:black;
  color:white;

  &:hover{
    transform:scale(0.9);
  }
`;

const ScoreContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  background-color: greenyellow;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: none;

  
`;


export default ShadeGrid;
