import './App.css';
import { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import History from './pages/History';
import Future from './pages/Future';


function App() {
  const [state, setState] = useState({
    user: null,
    countries: [],
    newCountry: {
      name: null,
      visited: false,
      userId: null,
    }
  });

  const [status, setStatus] = useState('button');

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
      <Switch>
        <Route exact path='/' render={() =>
          <HomePage />
        }/>
        <Route path='/history' render={() =>
          <History />
        }/>
        <Route path='/future' render={() =>
          <Future />
        }/>
        <Route render={() => <div>404 Not Found</div>} />
      </Switch>
    </div>
  );
}

export default App;
