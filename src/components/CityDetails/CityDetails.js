import { useContext } from 'react';
import { CityContext } from '../../contexts/CityContext';
import { DetailContext } from '../../contexts/DetailContext';
import Detail from '../Detail/Detail';
import DetailForm from '../DetailForm/DetailForm';
import './CityDetails.css';

const CityDetails = () => {
    const { cityState } = useContext(CityContext);
    const { toggleDetailStatus } = useContext(DetailContext);

    return (
        <div className='CityDetails'>
            { cityState.currentCity.name === cityState.open ? (
                <>
                    <ul>
                        { cityState.currentCity.details.length ? cityState.currentCity.details.map((detail, idx) => <Detail detail={detail} key={idx} />) : <li>No Details</li>}
                    </ul>
                    { cityState.detailStatus === 'new' ? <button onClick={toggleDetailStatus} >+ Add New</button> : <DetailForm />}
                    
                </>
            ) : null }
        </div>
    );
}
 
export default CityDetails;