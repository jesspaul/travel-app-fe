import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { CountryContext } from './CountryContext';

export const CityContext = createContext();

const CityContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(CountryContext);

  const [cityState, setCityState] = useState({
    currentCity: {
      newDetail: {
        text: ''
      }
    },
    editCityMode: false,
    open: '',
    detailStatus: 'new',
  });

  // load in all cities from the backend api
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
  
  // make api requests only on first page load
  useEffect(() => {
    getCityData();
  }, [state.currentCountry._id]);

  // handle form submission to add new city or update city in backend api
  async function handleCitySubmit(evt) {
    if (!user) return;

    evt.preventDefault();
    const BASE_URL = `http://localhost:3001/cities`;

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
    const BASE_URL = `http://localhost:3001/cities`;
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
  
  return (
    <CityContext.Provider value={{cityState, setCityState, handleCitySubmit, handleCityChange, selectCity, toggleCityEditMode, handleCityDelete}}>
      {props.children}
    </CityContext.Provider>
  )
}

export default CityContextProvider;