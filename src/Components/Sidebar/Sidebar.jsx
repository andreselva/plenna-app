import {Link} from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => (
    <div className="Sidebar">
        <div className="Sidebar-components">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/expenses">Expenses</Link>
        </div>
    </div>
);

export default Sidebar;
