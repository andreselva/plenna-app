import './Sidebar.css';
import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/Context/AuthContext';
import avatarUrl from '../../assets/avatar-padrao.svg';
import {
  ArrowLeft,
  ArrowRight,
  Bolt,
  LogOut,
  X,
} from 'lucide-react';
import { useBreakpoints } from '../../Hooks/useMediaQuery/useBreakpoints';
import ModalSettings from '../../Modals/ModalSettings/ModalSettings';
import { Role } from '../../enum/roles.enum';
import useModulesTree from '../../Hooks/useModulesTree/useModulesTree';
import { getSidebarRoutes } from '../../routes/routeAccess';

const SidebarItem = ({ as: Component = Link, icon, text, active, ...props }) => {
  return (
    <Component className={`Sidebar-item ${active ? 'active' : ''}`} {...props}>
      <div className="item-icon">{icon}</div>
      <span className="sidebar-item-text">{text}</span>
    </Component>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { user: currentUser, logout, isAuthenticated, isLoading } = useAuth();
  const { modulesTree, isLoadingModules } = useModulesTree();

  const navigate = useNavigate();
  const { isMobile, isTablet } = useBreakpoints();
  const location = useLocation();

  const defineName = (nameUser) => {
    if (!nameUser) return 'Olá';
    return `Olá, ${nameUser.trim().split(' ')[0]}`;
  };

  const stringNameUser = currentUser?.name ? defineName(currentUser.name) : 'Olá';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    if (isMobile || isTablet) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const sidebarClasses = `Sidebar ${isMobile || isTablet ? 'is-mobile' : 'is-desktop'} ${
    (!isMobile || !isTablet) && isCollapsed ? 'collapsed' : ''
  } ${(isMobile || isTablet) && isMobileOpen ? 'open' : ''}`;

  const navItems = useMemo(() => {
    return getSidebarRoutes(modulesTree).map((route) => ({
      key: route.path,
      to: route.path,
      text: route.meta?.label,
      icon: route.meta?.icon,
    }));
  }, [modulesTree]);

  if (isLoading || !isAuthenticated || !currentUser) return null;

  return (
    <>
      <div
        className={`sidebar-overlay ${(isMobile || isTablet) && isMobileOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      />

      <div className={sidebarClasses}>
        <button className="sidebar-toggle-button" onClick={toggleSidebar}>
          <span className="arrow">
            {isMobile || isTablet ? (
              isMobileOpen ? (
                <X width={15} />
              ) : null
            ) : isCollapsed ? (
              <ArrowRight width={15} />
            ) : (
              <ArrowLeft width={15} />
            )}
          </span>
        </button>

        <div className="Sidebar-title">
          <div className="profile-picture">
            <img src={avatarUrl} alt="Foto de perfil" />
          </div>
          <div className="profile-name">{stringNameUser}</div>
        </div>

        <nav className="Sidebar-nav">
          {isLoadingModules
            ? null
            : navItems.map((item) => (
                <SidebarItem
                  key={item.key}
                  icon={item.icon}
                  text={item.text}
                  to={item.to}
                  active={location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)}
                  onClick={() => {
                    if (isMobile || isTablet) setIsMobileOpen(false);
                  }}
                />
              ))}
        </nav>

        <div className="Sidebar-footer">
          {currentUser.role === Role.ADMIN && (
            <SidebarItem icon={<Bolt />} text="Configurações" onClick={() => setIsSettingsOpen(true)} />
          )}
          <SidebarItem icon={<LogOut />} text="Logout" to="/login" onClick={handleLogout} />
        </div>
      </div>

      <ModalSettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default Sidebar;