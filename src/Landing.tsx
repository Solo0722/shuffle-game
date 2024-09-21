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
      <button
        className="play-button"
        type="button"
        ref={buttonRef}
        onClick={() => setPhase(1)}
      >
        Play Now
      </button>

      <div className="fixed bottom-1 left-1/2 -translate-x-1/2 text-center items-center">
        <p className="mt-4">Made with ❤️ by Akesi Kreations</p>
        {/* <img src="/android-chrome-512.png" alt="logo" width={80} height={80} /> */}
      </div>
    </div>
  );
}

export default Landing