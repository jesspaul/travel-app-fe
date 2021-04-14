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
                        <Detail />
                        <Detail />
                        <Detail />
                    </ul>
                    <button className='add-new' >+ Add New</button>
                </>
            ) : null }
        </div>
    );
}
 
export default CityDetails;