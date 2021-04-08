import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CountryContext } from '../../contexts/CountryContext';
import CountryCard from '../CountryCard/CountryCard';
import './CountryGrid.css';

const CountryGrid = (props) => {
    const { state, selectCountry } = useContext(CountryContext);
    return (
        <div className="CountryGrid">
            {state.countries.length ? (
                props.branch === 'history' && state.countries.map(country => (
                    country.visited && 
                    <Link to='/details' onClick={() => selectCountry(country)}>
                        <CountryCard country={country}/>
                    </Link>
                ))
                ) : (
                    <div>No Countries in List</div>
                )
            }

            {state.countries.length ? (
                props.branch === 'future' && state.countries.map(country => (
                    !country.visited && 
                    <Link to='/details' onClick={() => selectCountry(country)}>
                        <CountryCard country={country}/>
                    </Link>
                ))
                ) : (
                    <div>No Countries in List</div>
                )
            }
            
        </div>
    );
}
 
export default CountryGrid;