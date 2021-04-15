import { useContext } from 'react';
import { CityContext } from '../../contexts/CityContext';
import { DetailContext } from '../../contexts/DetailContext';
import DetailForm from '../DetailForm/DetailForm';
import './Detail.css';

const Detail = (props) => {
    const { toggleDetailEditMode, handleDetailDelete } = useContext(DetailContext);
    const { cityState } = useContext(CityContext);
    return (
        <li>
            {props.detail.text}
            { cityState.editDetailMode === props.detail._id ? <DetailForm /> : <button className='detail-button' onClick={() => toggleDetailEditMode(props.detail._id)}>E</button> }
            
            <button className='detail-button' onClick={() => handleDetailDelete(props.detail._id)}>X</button>
        </li>
    );
}
 
export default Detail;