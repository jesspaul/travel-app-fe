import { useContext } from 'react';
import NewCountryButton from '../components/NewCountryButton/NewCountryButton';
import NewCountry from '../components/NewCountry/NewCountry';
import { CountryContext } from '../contexts/CountryContext';
import CountryGrid from '../components/CountryGrid/CountryGrid';

const ListPage = () => {
    const { state } = useContext(CountryContext);
    return (
        <div className="ListPage">
            <h2>{state.branch[0].toUpperCase() + state.branch.slice(1) + ' Page'}</h2>
            <CountryGrid />
            {
                state.status === 'button' ?
                <NewCountryButton />
                :
                <NewCountry />
            }
        </div>
    );
}
 
export default ListPage;