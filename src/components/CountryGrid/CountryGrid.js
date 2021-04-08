import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CountryContext } from '../../contexts/CountryContext';
import CountryCard from '../CountryCard/CountryCard';
import './CountryGrid.css';

const CountryGrid = () => {
    const { state } = useContext(CountryContext);
    return (
        <div className="CountryGrid">
            {state.countries.length ? (
                state.branch === 'history' && state.countries.map(country => (
                    country.visited && 
                    <Link to='/details'>
                        <CountryCard country={country}/>
                    </Link>
                ))
                ) : (
                    <div>No Countries in List</div>
                )
            }

            {state.countries.length ? (
                state.branch === 'future' && state.countries.map(country => (
                    !country.visited && 
                    <Link to='/details'>
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