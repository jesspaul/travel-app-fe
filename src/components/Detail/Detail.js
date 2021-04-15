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
            <p className="detail-text">{props.detail.text}</p>
            { cityState.editDetailMode === props.detail._id ? <DetailForm /> : <button className='detail-button' onClick={() => toggleDetailEditMode(props.detail._id)}><i class="fas fa-pencil-alt"></i></button> }
            
            <button className='detail-button' onClick={() => handleDetailDelete(props.detail._id)}><i class="fas fa-trash-alt"></i></button>
        </li>
    );
}
 
export default Detail;