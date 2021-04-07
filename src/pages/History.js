import { Link } from 'react-router-dom';

const History = () => {
    return (
        <div className="History">
            History Page
            <Link to='/new'>+ Add New Country</Link>
        </div>
    );
}
 
export default History;