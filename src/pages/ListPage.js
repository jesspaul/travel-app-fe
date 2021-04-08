import { useContext } from 'react';
import NewCountryButton from '../components/NewCountryButton/NewCountryButton';
import NewCountry from '../components/NewCountry/NewCountry';
import { CountryContext } from '../contexts/CountryContext';
import CountryGrid from '../components/CountryGrid/CountryGrid';

const ListPage = (props) => {
    const { state } = useContext(CountryContext);
    const branch = props.match.path.slice(1);
    return (
        <div className="ListPage">
            <h2>{branch[0].toUpperCase() + branch.slice(1) + ' Page'}</h2>
            <CountryGrid branch={branch} />
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