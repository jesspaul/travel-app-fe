import { useContext } from 'react';
import { CityContext } from '../../contexts/CityContext';
import { DetailContext } from '../../contexts/DetailContext';
import CityForm from '../CityForm/CityForm';
import Detail from '../Detail/Detail';
import DetailForm from '../DetailForm/DetailForm';
import './CityDetails.css';

const CityDetails = () => {
    const { cityState, toggleCityEditMode, handleCityDelete } = useContext(CityContext);
    const { toggleDetailStatus } = useContext(DetailContext);

    return (
        <div className='CityDetails'>
            { cityState.currentCity.name === cityState.open ? (
                <>
                <div className='details'>
                    <ul>
                        { cityState.currentCity.details.length ? cityState.currentCity.details.map((detail, idx) => <Detail detail={detail} key={idx} />) : <li>No Details</li>}
                        <li>
                            { cityState.detailStatus === 'new' ? <button className='detail-button' id='new-detail' onClick={toggleDetailStatus} ><i class="fas fa-plus"></i> New Detail</button> : <DetailForm />}
                        </li>
                    </ul>
                </div>
                <div className='buttons'>
                    { cityState.editCityMode ? <CityForm /> : <button className='med-button' onClick={toggleCityEditMode}><i class="fas fa-pencil-alt"></i> City</button>}
                    <button className='med-button' onClick={handleCityDelete}><i class="fas fa-trash-alt"></i> City</button>
                </div>
                </>
            ) : null }
        </div>
    );
}
 
export default CityDetails;