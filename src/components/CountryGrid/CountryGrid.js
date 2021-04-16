import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CountryContext } from '../../contexts/CountryContext';
import CountryCard from '../CountryCard/CountryCard';
import CountryForm from '../CountryForm/CountryForm';
import './CountryGrid.css';
import { UserContext } from '../../contexts/UserContext';

const CountryGrid = (props) => {
    const { user } = useContext(UserContext);
    const { state, selectCountry, toggleStatus } = useContext(CountryContext);

    const renderCards = () => {
        if (!user) return;
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
                <button className='big-button' onClick={toggleStatus}><i class="fas fa-plus"></i> New Country</button>
                :
                <CountryForm />
            }
        </div>
    );
}
 
export default CountryGrid;