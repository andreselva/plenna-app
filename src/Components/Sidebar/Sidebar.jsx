import './Sidebar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Auth/Context/AuthContext';
import avatarUrl from '../../assets/avatar-padrao.svg';
import { 
    ArrowLeft, 
    BanknoteArrowDown, 
    BanknoteArrowUp, 
    Bolt, 
    BriefcaseBusiness, 
    CreditCard, 
    Landmark, 
    LayoutDashboard, 
    LogOut
} from 'lucide-react';

const SidebarItem = ({ icon, text, to, onClick }) => {
    return (
        <Link to={to} onClick={onClick} className="Sidebar-item">
            <div className='item-icon'>{icon}</div>
            {text}
        </Link>
    );
};

const navItems = [
    { icon: <LayoutDashboard />, text: 'Dashboard', to: '/dashboard' },
    { icon: <BriefcaseBusiness />, text: 'Categorias', to: '/categories' },
    { icon: <BanknoteArrowDown />, text: 'Despesas', to: '/expenses' },
    { icon: <BanknoteArrowUp />, text: 'Receitas', to: '/revenues' },
    { icon: <Landmark />, text: 'Contas Bancárias', to: '/bank-accounts' },
    { icon: <CreditCard />, text: 'Faturas', to: '/invoices' }
];

const Sidebar = () => {
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
    };

    return (
        <div className="Sidebar">
            <button className='sidebar-toggle-button'>
                <span className='arrow'><ArrowLeft width={15}/></span>
            </button>
            <div className="Sidebar-title">
                <div className='profile-picture'>
                    <img src={avatarUrl} alt="Foto de perfil" />
                </div>
            </div>

            <nav className="Sidebar-nav">
                {navItems.map((item) => (
                    <SidebarItem 
                        key={item.text} 
                        icon={item.icon} 
                        text={item.text} 
                        to={item.to} 
                    />
                ))}
            </nav>

            <div className='Sidebar-footer'>
                <SidebarItem 
                    icon={<Bolt />} 
                    text="Configurações" 
                    to="/settings" 
                />
                <SidebarItem 
                    icon={<LogOut />} 
                    text="Logout" 
                    to="/login" 
                    onClick={handleLogout} 
                />
            </div>   
        </div>
    );
};

export default Sidebar;