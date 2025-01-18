import {Link} from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => (
    <div className="Sidebar">
        <div className="Sidebar-components">
            <Link to="/dashboard">Dashboard</Link>
        </div>
    </div>
);

export default Sidebar;
