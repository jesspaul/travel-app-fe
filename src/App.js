import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import CountryContextProvider from './contexts/CountryContext';
import UserContextProvider from './contexts/UserContext';
import DetailsPage from './pages/DetailsPage';
import CityContextProvider from './contexts/CityContext';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <CountryContextProvider>
          <CityContextProvider>
            <Header />
              <Switch>
                <Route exact path='/' render={() =>
                  <HomePage />
                }/>
                <Route path='/history' render={(props) =>
                      <ListPage {...props} />
                }/>
                <Route path='/future' render={(props) =>
                      <ListPage {...props} />
                }/>
                <Route path='/details' render={() =>
                      <DetailsPage />
                }/>
                <Route render={() => <div>404 Not Found</div>} />
              </Switch>
            </CityContextProvider>
          </CountryContextProvider>
        </UserContextProvider>
    </div>
  );
}

export default App;
