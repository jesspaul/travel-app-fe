import { useContext } from 'react';
import { DetailContext } from '../../contexts/DetailContext';
import './Detail.css';

const Detail = () => {
    const { handleDetailChange, handleDetailDelete } = useContext(DetailContext);
    return (
        <li>
            Detail
            <button className='detail-button' onClick={handleDetailChange}>E</button>
            <button className='detail-button' onClick={handleDetailDelete}>X</button>
        </li>
    );
}
 
export default Detail;