import { useContext } from 'react';
import { CityContext } from '../../contexts/CityContext';
import Detail from '../Detail/Detail';
import './CityDetails.css';

const CityDetails = (props) => {
    const { cityState } = useContext(CityContext);

    return (
        <div className='CityDetails'>
            { props.city.name === cityState.open ? (
                <>
                    <ul>
                        <li>Details for {props.city.name}</li>
                        { cityState.currentCity.details.length ? cityState.currentCity.details.map((detail, idx) => <Detail key={idx} />) : <li>No Details</li>}
                    </ul>
                    <button className='add-new' >+ Add New</button>
                </>
            ) : null }
        </div>
    );
}
 
export default CityDetails;