import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => (
    <div className="Sidebar">
        <div className="Sidebar-title">Financial System</div>
        <div className="Sidebar-components">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/expenses">Expenses</Link>
            <Link to="/revenues">Revenues</Link>
        </div>
    </div>
);

export default Sidebar;