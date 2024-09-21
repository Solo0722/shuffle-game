import './App.css'
import GlobalContextProvider from './context/GlobalContextProvider.tsx';
import Root from './Root.tsx';

function App() {

  return (
    <GlobalContextProvider>
    <Root/>
    </GlobalContextProvider>
  );
}

export default App
