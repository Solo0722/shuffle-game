import React, { createContext, useMemo, useState } from 'react'

export const GlobalContext = createContext({
  phase: 0,
  setPhase: (phase: number) => phase,
  level: "Easy",
  setLevel: (level:string) => level,
});
const GlobalContextProvider = ({children}:{children:React.ReactElement}) => {
    
    const [phase, setPhase] = useState(0);
    const [level,setLevel] = useState("Easy");

    const values = useMemo(() => {
        return {
            phase,
            setPhase,
            level,
            setLevel
        }
     }, [phase, setPhase,level,setLevel]);

    return (
      //@ts-expect-error value type not properly defined 
      <GlobalContext.Provider value={values}>{ children}</GlobalContext.Provider>
  )
}


export default GlobalContextProvider