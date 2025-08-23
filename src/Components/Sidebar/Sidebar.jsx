import './Sidebar.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/Context/AuthContext';
import avatarUrl from '../../assets/avatar-padrao.svg';
import { 
    ArrowLeft,
    ArrowRight,
    BanknoteArrowDown, 
    BanknoteArrowUp, 
    Bolt, 
    BriefcaseBusiness, 
    CreditCard, 
    Landmark, 
    LayoutDashboard, 
    LogOut,
    X
} from 'lucide-react';
import { useBreakpoints } from '../../Hooks/useMediaQuery/useBreakpoints';

const SidebarItem = ({ as: Component = Link, icon, text, ...props }) => {
    return (
        <Component className="Sidebar-item" {...props}>
            <div className='item-icon'>{icon}</div>
            <span className="sidebar-item-text">{text}</span>
        </Component>
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
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    const { logout } = useAuth();
    const navigate = useNavigate();

    const { isMobile } = useBreakpoints();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleSidebar = () => {
        if (isMobile) {
            setIsMobileOpen(!isMobileOpen);
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    const sidebarClasses = `Sidebar ${isMobile ? 'is-mobile' : 'is-desktop'} ${!isMobile && isCollapsed ? 'collapsed' : ''} ${isMobile && isMobileOpen ? 'open' : ''}`;

    return (
        <>
            <div 
                className={`sidebar-overlay ${isMobile && isMobileOpen ? 'active' : ''}`}
                onClick={toggleSidebar} 
            />

            <div className={sidebarClasses}>
                <button className='sidebar-toggle-button' onClick={toggleSidebar}>
                    <span className='arrow'>
                        {isMobile ? (
                            isMobileOpen ? <X width={15}/> : null
                        ) : (
                            isCollapsed ? <ArrowRight width={15}/> : <ArrowLeft width={15}/>
                        )}
                    </span>
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
                        as="button"
                        icon={<LogOut />} 
                        text="Logout" 
                        onClick={handleLogout} 
                    />
                </div>   
            </div>
        </>
    );
};

export default Sidebar;