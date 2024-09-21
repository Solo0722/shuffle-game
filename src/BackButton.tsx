import React, { useContext } from 'react'
import { GlobalContext } from './context/GlobalContextProvider';

const BackButton = () => {

    const { setPhase } = useContext(GlobalContext);

    const handleBackClick = () => {
        setPhase((phase:number) => phase -= 1);
    }

  return (
    <button className="back-button" onClick={handleBackClick}>
      ← Back
    </button>
  );
}

export default BackButton