import React, { useEffect, useRef, useState } from 'react'
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import Countdown from "react-countdown";
import { useSpring, animated } from "react-spring";
import "/node_modules/react-grid-layout/css/styles.css"
import "/node_modules/react-resizable/css/styles.css"

type ImageProp = {
  id: string,
  url: string
}

const ResponsiveGridLayout = WidthProvider(ReactGridLayout);

const Game = () => {

  const originalImages:ImageProp[] = [
    {
      id: 0,
      url: "/shade1.jpg",
    },
    {
      id: 1,
      url: "/shade2.jpg",
    },
    {
      id: 2,
      url: "/shade3.jpg",
    },
    {
      id: 3,
      url: "/shade4.jpg",
    },
    {
      id: 4,
      url: "/shade5.jpg",
    },
    {
      id: 5,
      url: "/shade6.jpg",
    },
    {
      id: 6,
      url: "/shade7.jpg",
    },
    {
      id: 7,
      url: "/shade8.jpg",
    },
    {
      id: 8,
      url: "/shade9.jpg",
    },
    {
      id: 9,
      url: "/shade10.jpg",
    },
    {
      id: 10,
      url: "/shade11.jpg",
    },
    {
      id: 11,
      url: "/shade12.jpg",
    },
    {
      id: 12,
      url: "/shade13.jpg",
    },
    {
      id: 13,
      url: "/shade14.jpg",
    },
    {
      id: 14,
      url: "/shade15.jpg",
    },
    {
      id: 15,
      url: "/shade16.jpg",
    },
    {
      id: 16,
      url: "/shade17.jpg",
    },
  ];
  const [shuffledImages, setShuffledImages] = useState<ImageProp[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [layout, setLayout] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const countdownRef = useRef(null);

  const { x, y, opacity } = useSpring({
    x: isGameStarted ? 0 : -100, // Initial x position
    y: isGameStarted ? 0 : -100, // Initial y position
    opacity: isGameStarted ? 1 : 0,
    config: { mass: 1, tension: 300, friction: 10 },
  });

  const scoreAnimation = useSpring({
    opacity: isGameOver ? 1 : 0,
    from: { opacity: 0 },
    config: { mass: 1, tension: 300, friction: 10 },
  });

  const startGame = () => {
    setIsGameStarted(true);
    // Start the countdown animation
    countdownRef.current.start();
  };

  const finishGame = () => {
    setIsGameOver(true);
    // Stop the countdown animation
    countdownRef.current.stop();
  };

  const renderer = ({ seconds }) => {
    return <div>{seconds}</div>;
  };

  const checkScore = () => {
    let correctOrder = true;
    for (let i = 0; i < shuffledImages.length - 1; i++) {
      if (shuffledImages[i].id > shuffledImages[i + 1].id) {
        correctOrder = false;
        break;
      }
    }

    if (correctOrder) {
      setScore(score + 1);
    }
  };

  const shuffleImages = (images:ImageProp[]) => {
    return images.sort(() => 0.5 - Math.random());
  }

  const resetGame = () => {
    const shuffled = shuffleImages(originalImages);
    setShuffledImages(shuffled);
    setIsGameStarted(true);
  };

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    // Check score based on new layout
    checkScore(newLayout);
  };

   useEffect(() => {
     // Initialize layout based on shuffledImages
     setLayout(
       shuffledImages.map((image, index) => ({
         i: image.id,
         x: 0, // Initial x position
         y: 0, // Initial y position
         w: 1, // Width (in grid units)
         h: 1, // Height (in grid units)
       }))
     );
   }, [shuffledImages]);

  useEffect(() => {
    const shuffled = shuffleImages(originalImages);
    setShuffledImages(shuffled);
  }, []);

  return (
      <div>
        <animated.div
          style={{ transform: `translate(${x}px, ${y}px)`, opacity }}
        >
          <ResponsiveGridLayout
            className="layout"
            layout={layout}
            onLayoutChange={onLayoutChange}
            cols={4} // Adjust number of columns as needed
          >
            {shuffledImages.map((image) => (
              <div key={image.id}>
                <img src={image.url} alt={`Shade ${image.id}`} />
              </div>
            ))}
          </ResponsiveGridLayout>
          <div>
            <button onClick={startGame} disabled={isGameStarted}>
              Start Game
            </button>
            <button onClick={finishGame} disabled={!isGameStarted}>
              Finish Game
            </button>
            {isGameStarted && (
              <Countdown
                ref={countdownRef}
                date={Date.now() + 3000}
                renderer={renderer}
              />
            )}
            {/* ... your game logic and layout */}
            {isGameOver && <div>Your score: {score}</div>}
          </div>
        </animated.div>
        <animated.div style={{ opacity: scoreAnimation.opacity }}>
          {isGameOver && <div>Your score: {score}</div>}
        </animated.div>
      </div>
  );
}

export default Game