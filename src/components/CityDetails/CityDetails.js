import { useContext } from 'react';
import { CityContext } from '../../contexts/CityContext';
import { DetailContext } from '../../contexts/DetailContext';
import Detail from '../Detail/Detail';
import DetailForm from '../DetailForm/DetailForm';
import './CityDetails.css';

const CityDetails = (props) => {
    const { cityState } = useContext(CityContext);
    const { toggleDetailStatus } = useContext(DetailContext);

    return (
        <div className='CityDetails'>
            { props.city.name === cityState.open ? (
                <>
                    <ul>
                        <li>Details for {props.city.name}</li>
                        { cityState.currentCity.details.length ? cityState.currentCity.details.map((detail, idx) => <Detail key={idx} />) : <li>No Details</li>}
                    </ul>
                    { cityState.detailStatus === 'new' ? <button onClick={toggleDetailStatus} >+ Add New</button> : <DetailForm />}
                    
                </>
            ) : null }
        </div>
    );
}
 
export default CityDetails;