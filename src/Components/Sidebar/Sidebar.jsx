import './Sidebar.css';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/Context/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import avatarUrl from '../../assets/avatar-padrao.svg';
import {
  ArrowLeft,
  ArrowRight,
  BanknoteArrowDown,
  BanknoteArrowUp,
  Bolt,
  BriefcaseBusiness,
  CreditCard,
  FileSpreadsheet,
  Landmark,
  LayoutDashboard,
  LogOut,
  X,
  Users,
  Calendar
} from 'lucide-react';
import { useBreakpoints } from '../../Hooks/useMediaQuery/useBreakpoints';
import ModalSettings from '../../Modals/ModalSettings/ModalSettings';
import { Role } from '../../enum/roles.enum';

const SidebarItem = ({ as: Component = Link, icon, text, active, ...props }) => {
  return (
    <Component className={`Sidebar-item ${active ? 'active' : ''}`} {...props}>
      <div className="item-icon">{icon}</div>
      <span className="sidebar-item-text">{text}</span>
    </Component>
  );
};

const moduleUi = {
  dashboards: { label: 'Dashboard', icon: <LayoutDashboard /> },
  categories: { label: 'Categorias', icon: <BriefcaseBusiness /> },
  expenses: { label: 'Despesas', icon: <BanknoteArrowDown /> },
  revenues: { label: 'Receitas', icon: <BanknoteArrowUp /> },
  bankAccounts: { label: 'Contas Bancárias', icon: <Landmark /> },
  invoices: { label: 'Faturas', icon: <CreditCard /> },
  reports: { label: 'Relatórios', icon: <FileSpreadsheet /> },
  users: { label: 'Usuários', icon: <Users /> },
  appointments: { label: 'Agendamentos', icon: <Calendar /> },
  tenants: { label: 'Tenants', icon: <Users /> },
};

function buildNavItemsFromTree(modulesTree = []) {
  const items = [];

  const walk = (node) => {
    const isAllowedInSidebar = node.showInSidebar;
    if (isAllowedInSidebar && node?.route) {
      const meta = moduleUi[node.name] || {};
      items.push({
        key: node.key,
        to: node.route,
        text: meta.label || node.description || node.name,
        icon: meta.icon || <FileSpreadsheet />,
      });
    }
    (node?.childrenModules || []).forEach(walk);
  };

  modulesTree.forEach(walk);

  const seen = new Set();
  return items.filter((i) => {
    if (seen.has(i.to)) return false;
    seen.add(i.to);
    return true;
  });
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [modulesTree, setModulesTree] = useState(null);
  const [isLoadingModules, setIsLoadingModules] = useState(false);

  const { user: currentUser, logout, isAuthenticated, isLoading } = useAuth();

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

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) return;

    let cancelled = false;

    (async () => {
      try {
        setIsLoadingModules(true);

        const { data: response } = await axiosInstance.get('/client-modules');

        if (cancelled) return;
        setModulesTree(response?.payload?.modules.items ?? []);
      } catch {
        if (cancelled) return;
        setModulesTree([]);
      } finally {
        if (cancelled) return;
        setIsLoadingModules(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isLoading, isAuthenticated]);

  const navItems = useMemo(() => {
    if (!modulesTree) return [];
    return buildNavItemsFromTree(modulesTree);
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
          {isLoadingModules ? null : (
            navItems.map((item) => (
              <SidebarItem
                key={item.key}
                icon={item.icon}
                text={item.text}
                to={item.to}
                active={location.pathname.startsWith(item.to)}
                onClick={() => {
                  if (isMobile || isTablet) setIsMobileOpen(false);
                }}
              />
            ))
          )}
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
