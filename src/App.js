import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import History from './pages/History';
import Future from './pages/Future';
import CountryContextProvider from './contexts/CountryContext';
import UserContextProvider from './contexts/UserContext';


function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Header />
      </UserContextProvider>
      <Switch>
        <Route exact path='/' render={() =>
          <HomePage />
        }/>
        <Route path='/history' render={() =>
          <CountryContextProvider>
            <History />
          </CountryContextProvider>
        }/>
        <Route path='/future' render={() =>
          <CountryContextProvider>
            <Future />
          </CountryContextProvider>
        }/>
        <Route render={() => <div>404 Not Found</div>} />
      </Switch>
    </div>
  );
}

export default App;
