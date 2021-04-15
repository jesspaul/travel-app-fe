import DetailForm from '../DetailForm/DetailForm';
import './Detail.css';

const Detail = (props) => {
    return (
        <li>
            <p className="detail-text">{props.detail.text}</p>
            { props.cityState.editDetailMode === props.detail._id ? <DetailForm /> : <button className='detail-button' onClick={() => props.toggleDetailEditMode(props.detail._id)}><i class="fas fa-pencil-alt"></i></button> }
            
            <button className='detail-button' onClick={() => props.handleDetailDelete(props.detail._id)}><i class="fas fa-trash-alt"></i></button>
        </li>
    );
}
 
export default Detail;