import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { CityContext } from './CityContext';
import { CountryContext } from './CountryContext';

export const DetailContext = createContext();

const DetailContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(CountryContext);
  const { cityState, setCityState } = useContext(CityContext);

  // handle form submission to add new detail or update detail in backend api
  async function handleDetailSubmit(evt) {
    if (!user) return;

    evt.preventDefault();
    const BASE_URL = `http://localhost:3001/cities`;

    // if adding a new detail
    if (!cityState.editCityMode) {      
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
          name,
          date,
        },
        editCityMode: false
      }))
    }
  }

  // continuously update state as user types city name in input
  function handleDetailChange(evt) {
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

  function toggleDetailEditMode() {
    setCityState(prevState => ({
      ...prevState,
      editCityMode: prevState.editCityMode ? false : true,
    }));
  }

  async function handleDetailDelete() {
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
    <DetailContext.Provider value={{handleDetailSubmit, handleDetailChange, toggleDetailEditMode, handleDetailDelete}}>
      {props.children}
    </DetailContext.Provider>
  )
}

export default DetailContextProvider;