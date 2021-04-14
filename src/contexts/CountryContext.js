import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { searchPhoto } from '../services/unsplash';

export const CountryContext = createContext();

const CountryContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const [state, setState] = useState({
    countries: [],
    restCountriesData: [],
    newCountry: {
      name: null,
      visited: false,
      uid: null,
      flagPath: null,
      imagePath: null
    },
    status: 'button',
    branch: null,
    currentCountry: {
      newCity: {
        name: null,
        date: null,
      },
      cities: [],
    },
    editMode: false,
    editCityMode: false,
  });

  // load in all countries from the backend api
  async function getAppData() {
    if (!user) return;
    try {
      const URL = `http://localhost:3001/countries?uid=${user.uid}`;
      const countries = await fetch(URL).then(res => res.json());
      setState(prevState => ({
        ...prevState,
        countries,
      }))
    } catch (error) {
      console.log(error);
    }
  }
  
  async function getCityData() {
    if (!user) return;
    try {
      const URL = `http://localhost:3001/cities?countryId=${state.currentCountry._id}`;
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
  
  // make api requests only on first page load
  useEffect(() => {
    getAppData();
    getCountryData();
    getCityData();
  }, [user]);

  // useEffect(() => {
  //   getCityData();
  // }, [state.currentCountry]);

  // handle form submission to add new country or update country in backend api
  async function handleSubmit(evt) {
    if (!user) return;

    evt.preventDefault();
    const BASE_URL = 'http://localhost:3001/countries';

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

  async function handleCitySubmit(evt) {
    if (!user) return;

    evt.preventDefault();
    const BASE_URL = `http://localhost:3001/cities`;

    // if adding a new city
    if (!state.editCityMode) {
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

      const cities = await fetch(`${BASE_URL}/${state.currentCity._id}?countryId=${state.currentCountry._id}`, {
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
          currentCity: {
            name,
            date,
          },
        },
        editCityMode: false
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
          name: null,
          date: null
        }
      }
    }))
  }

  // capture's data of the city card that was clicked
  function selectCity(clickedCity) {
    setState(prevState => ({
      ...prevState,
      currentCity: {
        ...clickedCity,
      }
    }))
  }

  async function handleDelete(countryId) {
    if(!user) return;
    const URL = `http://localhost:3001/countries/${countryId}`;
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

  function toggleCityEditMode() {
    setState(prevState => ({
      ...prevState,
      editCityMode: prevState.editCityMode ? false : true,
    }));
}
  
  return (
    <CountryContext.Provider value={{state, setState, handleSubmit, handleChange, toggleStatus, toggleBranch, selectCountry, handleDelete, toggleEditMode, handleCityChange, handleCitySubmit, toggleCityEditMode, selectCity}}>
      {props.children}
    </CountryContext.Provider>
  )
}

export default CountryContextProvider;