import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';
import CountryCard from '../CountryCard/CountryCard';

const CountryGrid = () => {
    const { state } = useContext(CountryContext);
    return (
        <div className="CountryGrid">
            Country Grid
            {state.countries.length ? 
                state.countries.map(country => <CountryCard country={country}/>)
                :
                <div>No Countries in List</div>
            }
        </div>
    );
}
 
export default CountryGrid;