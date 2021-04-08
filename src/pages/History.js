import { useContext } from 'react';
import NewCountryButton from '../components/NewCountryButton/NewCountryButton';
import NewCountry from '../components/NewCountry/NewCountry';
import { CountryContext } from '../contexts/CountryContext';

const History = () => {
    const { state } = useContext(CountryContext);
    return (
        <div className="History">
            History Page
            {
                state.status === 'button' ?
                <NewCountryButton />
                :
                <NewCountry />
            }
        </div>
    );
}
 
export default History;