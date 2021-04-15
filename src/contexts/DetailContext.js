import { createContext, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { CityContext } from './CityContext';
import { CountryContext } from './CountryContext';

export const DetailContext = createContext();

const DetailContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const { state } = useContext(CountryContext);
  const { cityState, setCityState } = useContext(CityContext);

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
  
  // make api requests only on first page load
  useEffect(() => {
    getDetailData();
  }, [cityState.currentCity._id]);

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
  
  return (
    <DetailContext.Provider value={{handleDetailSubmit, handleDetailChange, toggleDetailEditMode, handleDetailDelete, toggleDetailStatus}}>
      {props.children}
    </DetailContext.Provider>
  )
}

export default DetailContextProvider;