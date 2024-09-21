import gsap from 'gsap';
import React, { useContext, useEffect, useRef } from 'react'
import { GlobalContext } from './context/GlobalContextProvider';

const Landing = () => {
  // Refs for title and button
  const titleRef = useRef(null);
  const buttonRef = useRef(null);

  const { setPhase } = useContext(GlobalContext);

  useEffect(() => {
    // GSAP Animation: Title fades and moves in from the top, followed by button
    gsap.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      buttonRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <div className="intro-container">
      <h1 className="game-title pacifico-regular" ref={titleRef}>
        Shade Shuffle
      </h1>
      <button className="play-button" type="button" ref={buttonRef} onClick={() => setPhase(1)}>
        Play Now
      </button>
    </div>
  );
}

export default Landing