import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CountryContext } from '../../contexts/CountryContext';
import CountryCard from '../CountryCard/CountryCard';
import NewCountry from '../NewCountry/NewCountry';
import AddNewButton from '../AddNewButton/AddNewButton';
import './CountryGrid.css';
import { UserContext } from '../../contexts/UserContext';

const CountryGrid = (props) => {
    const { user } = useContext(UserContext);
    const { state, selectCountry } = useContext(CountryContext);

    const renderCards = () => {
        if (props.branch === 'history') {
            return state.countries.map((country, idx) =>
                country.visited && 
                <Link className='body-link' to='/details' key={idx} onClick={() => selectCountry(country)}>
                    <CountryCard country={country}/>
                </Link>
            );
        } else if (props.branch === 'future') {
            return state.countries.map((country, idx) => (
                !country.visited && 
                <Link className='body-link' to='/details' key={idx} onClick={() => selectCountry(country)}>
                    <CountryCard country={country}/>
                </Link>
            ))
        }
    }
    return (
        <div className="CountryGrid">
            {state.countries.length ? renderCards()
                : <div>No Countries in List</div>
            }
            {
                state.status === 'button' ?
                <AddNewButton />
                :
                <NewCountry />
            }
        </div>
    );
}
 
export default CountryGrid;