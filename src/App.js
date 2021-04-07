import './App.css';
import { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import Header from './components/Header/Header';


function App() {
  const [state, setState] = useState({
    user: null,
    countries: [],
  });

  useEffect(() => {
    // getAppData();
    auth.onAuthStateChanged(user => {
      setState(prevState => ({
        ...prevState,
        user,
      }));
    });
  }, []);
  // async function getAppData() {
  //   try {
      
  //   } catch (error) {
      
  //   }
  // }

  return (
    <div className="App">
      <Header user={state.user} />
    </div>
  );
}

export default App;
