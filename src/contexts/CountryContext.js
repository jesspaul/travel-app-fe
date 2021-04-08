import { createContext, useContext, useState } from 'react';

export const CountryContext = createContext();

const CountryContextProvider = (props) => {
  const { user } = useContext()
  const [state, setState] = useState({
    countries: [],
    newCountry: {
      name: null,
      visited: false,
      userId: null,
    },
    status: 'button'
  });

  async function addCountry(evt) {
    if (!state.user) return;

    evt.preventDefault();
    const BASE_URL = 'http://localhost:3001/countries';
    const country = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
          'Content-type': 'Application/json'
      },
      body: JSON.stringify(state.newCountry)
    }).then(res => res.json());

    setState(prevState => ({
      ...prevState,
      countries: [...prevState.countries, country],
      newCountry: {
        name: null,
        visited: false,
        userId: null,
      },
      status: 'button'
    }));
  }

  function handleChange(evt) {
    setState(prevState => ({
      ...prevState,
      newCountry: {
        ...prevState.newCountry,
        [evt.target.name]: evt.target.value,
        userId: state.user.uid,
      }
    }));
  }

  function toggleStatus() {
    setState(prevState => ({
      ...prevState,
      status: 'new-country'
    }));
  }

  return (
    <CountryContext.Provider value={{state, setState, addCountry, handleChange, toggleStatus}}>
      {props.children}
    </CountryContext.Provider>
  )
}

export default CountryContextProvider;