import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { CityContext } from './CityContext';
import { CountryContext } from './CountryContext';

export const DetailContext = createContext();

const DetailContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(CountryContext);
  const { cityState, setCityState } = useContext(CityContext);

  // load in all cities from the backend api
  async function getDetailData() {
    if (!user) return;
    try {
      const URL = `http://localhost:3001/details?countryId=${state.currentCountry._id}&cityId=${cityState.currentCity._id}`;
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
  
  // make api requests only on first page load
  useEffect(() => {
    getDetailData();
  }, [cityState.currentCity._id]);

  // handle form submission to add new detail or update detail in backend api
  async function handleDetailSubmit(evt) {
    if (!user) return;

    evt.preventDefault();
    const BASE_URL = `http://localhost:3001/details`;

    // if adding a new detail
    if (!cityState.editCityMode) {      
      // make a post request to the backend api
      const details = await fetch(`${BASE_URL}?countryId=${state.currentCountry._id}?cityId=${cityState.currentCity._id}`, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({...cityState.currentCity.newDetail})
      }).then(res => res.json());
  
      // add country to state and set newCountry back to default
      setState((prevState) => ({
        ...prevState,
        currentCity: {
          ...prevState.currentCountry,
          details,
          newDetail: {
            text: ''
          },
        },
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
    setCityState(prevState => ({
      ...prevState,
      currentCity: {
        ...prevState.currentCity,
        newCity: {
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

  function toggleDetailEditMode() {
    setCityState(prevState => ({
      ...prevState,
      detailEditMode: prevState.editCityMode ? false : true,
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
    <DetailContext.Provider value={{handleDetailSubmit, handleDetailChange, toggleDetailEditMode, handleDetailDelete, toggleDetailStatus}}>
      {props.children}
    </DetailContext.Provider>
  )
}

export default DetailContextProvider;