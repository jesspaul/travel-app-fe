import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './services/firebase';
import { searchPhoto } from './services/unsplash';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailsPage from './pages/DetailsPage';

function App() {
  ///////////////// Users /////////////////
  const [user, setUser] = useState(null);
  useEffect(() => {
    const cancelSubscription = auth.onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });

    return function() { // cleanup function
      cancelSubscription();
    }
  }, [user]);




  ///////////////// Countries /////////////////
  const [state, setState] = useState({
    countries: [],
    restCountriesData: [],
    newCountry: {
      name: '',
      visited: false,
      uid: '',
      flagPath: '',
      imagePath: ''
    },
    status: 'button',
    branch: null,
    currentCountry: {
      newCity: {
        name: '',
        date: '',
      },
      cities: [],
    },
    editMode: false,
  });

  // make api requests only on first page load
  useEffect(() => {
    // load in all countries from the backend api
    async function getAppData() {
      if (!user) return;
      try {
        const URL = `https://travel-tracker-be.herokuapp.com/countries?uid=${user.uid}`;
        const countries = await fetch(URL).then(res => res.json());
        setState(prevState => ({
          ...prevState,
          countries,
        }))
      } catch (error) {
        console.log(error);
      }
    }
    
    // load in list of all countries from restcountries api
    async function getCountryData() {
      try {
        const BASE_URL = 'https://restcountries.eu/rest/v2/all';
        const countriesData = await fetch(BASE_URL).then(res => res.json());
        setState(prevState=> ({
          ...prevState,
          restCountriesData: countriesData
        }))
      } catch (error) {
        console.log(error);
      }
    }
  
    getAppData();
    getCountryData();
  }, [user]);

  // handle form submission to add new country or update country in backend api
  async function handleSubmit(evt) {
    if (!user) return;

    evt.preventDefault();
    const BASE_URL = 'https://travel-tracker-be.herokuapp.com/countries';

    // if adding a new country
    if (!state.editMode) {
      // find the country flag from restcountries api
      let restCountry = state.restCountriesData.find(elem => elem.name === state.newCountry.name);
      state.newCountry.flagPath = restCountry.flag ? restCountry.flag : null;
      // find an image of the country from unsplash api
      const picResults = await searchPhoto(state.newCountry.name);
      state.newCountry.imagePath = picResults.results[0].urls.regular;
      
      // change date string to month, year
      if (state.branch === 'history') {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const year = state.newCountry.date.slice(0, 4);
        const month = months[parseInt(state.newCountry.date.slice(5)) - 1];
        state.newCountry.date = `${month}, ${year}`;
      }
  
      // make a post request to the backend api
      const countries = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({...state.newCountry, uid: user.uid})
      }).then(res => res.json());
  
      // add country to state and set newCountry back to default
      setState((prevState) => ({
        ...prevState,
        countries,
        newCountry: {
          name: null,
          visited: state.branch === 'history',
          uid: null,
          flagPath: null,
          imagePath: null,
        },
        status: 'button'
      }));
    // if editing an existing country
    } else {
      // find the country flag from restcountries api
      let restCountry = state.restCountriesData.find(elem => elem.name === state.newCountry.name);
      state.newCountry.flagPath = restCountry.flag ? restCountry.flag : null;
      // find an image of the country from unsplash api
      const picResults = await searchPhoto(state.newCountry.name);
      state.newCountry.imagePath = picResults.results[0].urls.regular;
      // change date string to month, year
      if (state.branch === 'history') {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const year = state.newCountry.date.slice(0, 4);
        const month = months[parseInt(state.newCountry.date.slice(5)) - 1];
        state.newCountry.date = `${month}, ${year}`;
      }

      const { name, date, flagPath, imagePath } = state.newCountry;

      const countries = await fetch(`${BASE_URL}/${state.currentCountry._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify({name, date, flagPath, imagePath})
      }).then(res => res.json());

      setState(prevState => ({
        ...prevState,
        countries,
        currentCountry: {
          ...prevState.currentCountry,
          name,
          date,
          flagPath,
          imagePath
        },
        newCountry: {
          name: null,
          visited: state.branch === 'history',
          uid: null,
          flagPath: null,
          imagePath: null,
        },
        editMode: false
      }))
    }
  }

  // continuously update state as user types country name in input
  function handleChange(evt) {
    setState(prevState => ({
      ...prevState,
      newCountry: {
        ...prevState.newCountry,
        [evt.target.name]: evt.target.value,
        visited: state.branch === 'history'
      }
    }));
  }

  // change status in state to show new country form or button
  function toggleStatus() {
    setState(prevState => ({
      ...prevState,
      status: 'new-form'
    }));
  }

  // change state to show if on history or future branch
  function toggleBranch(branchPath) {
    setState(prevState => ({
      ...prevState,
      branch: branchPath
    }));
  }

  // capture's data of the country card that was clicked
  function selectCountry(clickedCountry) {
    setState(prevState => ({
      ...prevState,
      currentCountry: {
        ...clickedCountry,
        newCity: {
          name: '',
          date: '',
        },
      }
    }))
  }

  // delete a country
  async function handleDelete(countryId) {
    if(!user) return;
    const URL = `https://travel-tracker-be.herokuapp.com/countries/${countryId}`;
    const countries = await fetch(URL, {
      method: 'DELETE'
    }).then(res => res.json());

    setState(prevState => ({
      ...prevState,
      countries
    }));
  }
  
  function toggleEditMode() {
    const current = state.currentCountry;
    setState(prevState => ({
      ...prevState,
      editMode: prevState.editMode ? false : true,
      newCountry: prevState.editMode ? {...prevState.newCountry} : {...current},
    }));
  }

  const [cityState, setCityState] = useState({
    currentCity: {
      newDetail: {
        text: ''
      }
    },
    editCityMode: false,
    open: '',
    detailStatus: 'new',
    editDetailMode: '',
  });




  ///////////////// Cities /////////////////
  // make api requests only on first page load
  useEffect(() => {
    // load in all cities from the backend api
    async function getCityData() {
      if (!user) return;
      try {
        const URL = `https://travel-tracker-be.herokuapp.com/cities?countryId=${state.currentCountry._id}`;
        const cities = await fetch(URL).then(res => res.json());
        setState(prevState => ({
          ...prevState,
          currentCountry: {
            ...prevState.currentCountry,
            cities
          }
        }))
      } catch (error) {
        console.log(error);
      }
    }
  
    getCityData();
  }, [state.currentCountry._id, setState, user]);

  // handle form submission to add new city or update city in backend api
  async function handleCitySubmit(evt) {
    if (!user) return;

    evt.preventDefault();
    const BASE_URL = `https://travel-tracker-be.herokuapp.com/cities`;

    // if adding a new city
    if (!cityState.editCityMode) {
      // change date string to month, year
      if (state.branch === 'history') {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const year = state.currentCountry.newCity.date.slice(0, 4);
        const month = months[parseInt(state.currentCountry.newCity.date.slice(5)) - 1];
        state.currentCountry.newCity.date = `${month}, ${year}`;
      }
  
      // make a post request to the backend api
      const cities = await fetch(`${BASE_URL}?countryId=${state.currentCountry._id}`, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({...state.currentCountry.newCity})
      }).then(res => res.json());
  
      // add country to state and set newCountry back to default
      setState((prevState) => ({
        ...prevState,
        currentCountry: {
          ...prevState.currentCountry,
          cities,
          newCity: {
            name: '',
            date: '',
          },
        },
        status: 'button'
      }));
    // if editing an existing city
    } else {
      // change date string to month, year
      if (state.branch === 'history') {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const year = state.currentCountry.newCity.date.slice(0, 4);
        const month = months[parseInt(state.currentCountry.newCity.date.slice(5)) - 1];
        state.currentCountry.newCity.date = `${month}, ${year}`;
      }

      const { name, date } = state.currentCountry.newCity;

      const cities = await fetch(`${BASE_URL}/${cityState.currentCity._id}?countryId=${state.currentCountry._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify({name, date})
      }).then(res => res.json());

      setState(prevState => ({
        ...prevState,
        currentCountry: {
          ...prevState.currentCountry,
          cities,
        },
      }));
      
      setCityState(prevState => ({
        ...prevState,
        currentCity: {
          ...prevState.currentCity,
          name,
          date,
        },
        editCityMode: false
      }))
    }
  }

  // continuously update state as user types city name in input
  function handleCityChange(evt) {
    setState(prevState => ({
      ...prevState,
      currentCountry: {
        ...prevState.currentCountry,
        newCity: {
          ...prevState.currentCountry.newCity,
          [evt.target.name]: evt.target.value,
        }
      }
    }));
  }

  // capture's data of the city card that was clicked
  function selectCity(clickedCity) {
    setCityState(prevState => ({
      ...prevState,
      currentCity: {
        ...prevState.currentCity,
        ...clickedCity,
      },
      open: clickedCity.name
    }))
  }

  function toggleCityEditMode() {
    setCityState(prevState => ({
      ...prevState,
      editCityMode: prevState.editCityMode ? false : true,
    }));
  }

  async function handleCityDelete() {
    if(!user) return;
    const BASE_URL = `https://travel-tracker-be.herokuapp.com/cities`;
    const cities = await fetch(`${BASE_URL}/${cityState.currentCity._id}?countryId=${state.currentCountry._id}`, {
      method: 'DELETE'
    }).then(res => res.json());

    setState(prevState => ({
      ...prevState,
      currentCountry: {
        ...prevState.currentCountry,
        cities,
      },
    }));
  }




  ///////////////// Details /////////////////
  useEffect(() => {
    // load in all cities from the backend api
    async function getDetailData() {
      if (!user) return;
      try {
        const URL = `https://travel-tracker-be.herokuapp.com/details?countryId=${state.currentCountry._id}&cityId=${cityState.currentCity._id}`;
        const details = await fetch(URL).then(res => res.json());
        setCityState(prevState => ({
          ...prevState,
          currentCity: {
            ...prevState.currentCity,
            details
          }
        }))
      } catch (error) {
        console.log(error);
      }
    }
  
    getDetailData();
  }, [cityState.currentCity._id, setCityState, state.currentCountry._id, user]);

  // handle form submission to add new detail or update detail in backend api
  async function handleDetailSubmit(evt) {
    if (!user) return;

    evt.preventDefault();
    const BASE_URL = `https://travel-tracker-be.herokuapp.com/details`;

    // if adding a new detail
    if (!cityState.editDetailMode) {      
      // make a post request to the backend api
      const details = await fetch(`${BASE_URL}?countryId=${state.currentCountry._id}&cityId=${cityState.currentCity._id}`, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({...cityState.currentCity.newDetail})
      }).then(res => res.json());
  
      // add country to state and set newCountry back to default
      setCityState((prevState) => ({
        ...prevState,
        currentCity: {
          ...prevState.currentCity,
          details,
          newDetail: {
            text: ''
          },
        },
      }));

      let textarea = document.getElementById('detail-textarea')
      textarea.value = '';

    // if editing an existing city
    } else {
      const { text } = cityState.currentCity.newDetail;

      const details = await fetch(`${BASE_URL}/${cityState.editDetailMode}?countryId=${state.currentCountry._id}&cityId=${cityState.currentCity._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify({text})
      }).then(res => res.json());

      setCityState((prevState) => ({
        ...prevState,
        currentCity: {
          ...prevState.currentCity,
          details,
        },
        editDetailMode: ''
      }));
    }
  }

  // continuously update state as user types city name in input
  function handleDetailChange(evt) {
    setCityState(prevState => ({
      ...prevState,
      currentCity: {
        ...prevState.currentCity,
        newDetail: {
          ...prevState.currentCity.newDetail,
          [evt.target.name]: evt.target.value,
        }
      }
    }));
  }

  function toggleDetailStatus() {
    setCityState(prevState => ({
      ...prevState,
      detailStatus: 'form',
    }));
  }

  function toggleDetailEditMode(detailId) {
    setCityState(prevState => ({
      ...prevState,
      editDetailMode: detailId,
    }));
  }

  async function handleDetailDelete(detailId) {
    if(!user) return;
    const BASE_URL = `https://travel-tracker-be.herokuapp.com/details`;
    const details = await fetch(`${BASE_URL}/${detailId}?countryId=${state.currentCountry._id}&cityId=${cityState.currentCity._id}`, {
      method: 'DELETE'
    }).then(res => res.json());

    setCityState((prevState) => ({
      ...prevState,
      currentCity: {
        ...prevState.currentCity,
        details,
      },
    }));
  }





  ///////////////// Render /////////////////
  return (
    <div className="App">
      <Header
        user={user}
        state={state}
        toggleBranch={toggleBranch}
      />
        <Switch>
          <Route exact path='/' render={() =>
            <HomePage />
          }/>
          <Route path='/history' render={(props) =>
                <ListPage
                  {...props}
                  user={user}
                  state={state}
                  selectCountry={selectCountry}
                  toggleStatus={toggleStatus}
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                />
          }/>
          <Route path='/future' render={(props) =>
                <ListPage
                  {...props}
                  user={user}
                  state={state}
                  selectCountry={selectCountry}
                  toggleStatus={toggleStatus}
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                />
          }/>
          <Route path='/details' render={() =>
                <DetailsPage
                  state={state}
                  handleDelete={handleDelete}
                  toggleEditMode={toggleEditMode}
                  toggleStatus={toggleStatus}
                  cityState={cityState}
                  toggleCityEditMode={toggleCityEditMode}
                  handleCityDelete={handleCityDelete}
                  selectCity={selectCity}
                  handleCitySubmit={handleCitySubmit}
                  handleCityChange={handleCityChange}
                  toggleDetailStatus={toggleDetailStatus}
                  toggleDetailEditMode={toggleDetailEditMode}
                  handleDetailDelete={handleDetailDelete}
                  handleDetailChange={handleDetailChange}
                  handleDetailSubmit={handleDetailSubmit}
                />
          }/>
          <Route render={() => <div>404 Not Found</div>} />
        </Switch>
    </div>
  );
}

export default App;
