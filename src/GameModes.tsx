import gsap from 'gsap';
import React, { useContext, useEffect, useRef } from 'react'
import BackButton from './BackButton';
import { GlobalContext } from './context/GlobalContextProvider';

const GameModes = () => {
  const levelsRef = useRef([]);
  const { setPhase,setLevel } = useContext(GlobalContext);
  
  useEffect(() => { 
    gsap.fromTo(
      levelsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.2 }
    );
  }, []);

  const handleLevelSelect = (level:string) => {
    setLevel(level);
    //@ts-expect-error type is not proper
    setPhase((phase:number) => phase += 1);
  }

  return (
    <div className="levels-container">
      <BackButton/>
      <h2 className="levels-title">Select Level</h2>
      <div className="levels-buttons">
        {["Easy", "Medium", "Hard"].map((level, index) => (
          <button
            disabled={level !== "Easy"}
            key={index}
            className="level-button"
            onClick={() => handleLevelSelect(level)}
            ref={(el) => (levelsRef.current[index] = el)}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameModes