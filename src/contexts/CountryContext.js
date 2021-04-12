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
    currentCountry: {},
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
  }, [user]);

  // add a country to the backend api
  async function addCountry(evt) {
    if (!user) return;

    evt.preventDefault();
    
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

    console.log({...state.newCountry, uid: user.uid});

    // make a post request to the backend api
    const BASE_URL = 'http://localhost:3001/countries';
    const fetchCountries = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
          'Content-type': 'Application/json'
      },
      body: JSON.stringify({...state.newCountry, uid: user.uid})
    }).then(res => res.json());

    console.log('fetch countries: ', fetchCountries)

    // add country to state and set newCountry back to default
    setState(prevState => ({
      ...prevState,
      fetchCountries,
      newCountry: {
        name: null,
        visited: state.branch === 'history',
        uid: null,
        flagPath: null,
        imagePath: null,
      },
      status: 'button'
    }));
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
      currentCountry: clickedCountry
    }))
  }

  async function handleDelete(countryId) {
    if(!state.user) return;
    const URL = `http://localhost:3001/countries/${countryId}`;
    const countries = await fetch(URL, {
      method: 'DELETE'
    }).then(res => res.json());

    setState(prevState => ({
      ...prevState,
      countries
    }));
  }

  return (
    <CountryContext.Provider value={{state, setState, addCountry, handleChange, toggleStatus, toggleBranch, selectCountry, handleDelete}}>
      {props.children}
    </CountryContext.Provider>
  )
}

export default CountryContextProvider;