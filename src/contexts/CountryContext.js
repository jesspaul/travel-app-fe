import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

export const CountryContext = createContext();

const CountryContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const [state, setState] = useState({
    countries: [],
    newCountry: {
      name: null,
      visited: false,
      userId: null,
    },
    status: 'button',
    branch: null
  });

  async function getAppData() {
    try {
      const BASE_URL = 'http://localhost:3001/countries';
      const countries = await fetch(BASE_URL).then(res => res.json());
      setState(prevState => ({
        ...prevState,
        countries,
      }))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAppData();
  }, []);

  async function addCountry(evt) {
    if (!user) return;

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
        visited: state.branch === 'history',
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
        visited: state.branch === 'history',
        userId: user.uid,
      }
    }));
  }

  function toggleStatus() {
    setState(prevState => ({
      ...prevState,
      status: 'new-country'
    }));
  }

  function toggleBranch(path) {
    setState(prevState => ({
      ...prevState,
      branch: path
    }));
  }

  return (
    <CountryContext.Provider value={{state, setState, addCountry, handleChange, toggleStatus, toggleBranch}}>
      {props.children}
    </CountryContext.Provider>
  )
}

export default CountryContextProvider;