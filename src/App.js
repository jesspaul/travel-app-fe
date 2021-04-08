import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import CountryContextProvider from './contexts/CountryContext';
import UserContextProvider from './contexts/UserContext';


function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <CountryContextProvider>
          <Header />
            <Switch>
              <Route exact path='/' render={() =>
                <HomePage />
              }/>
              <Route path='/history' render={() =>
                    <ListPage />
              }/>
              <Route path='/future' render={() =>
                    <ListPage />
                  }/>
              <Route render={() => <div>404 Not Found</div>} />
            </Switch>
          </CountryContextProvider>
        </UserContextProvider>
    </div>
  );
}

export default App;
