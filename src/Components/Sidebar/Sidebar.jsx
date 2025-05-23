import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { UserSettingsIcon } from '../Icons/UserSettingIcon';
import { BotaoGlobal } from '../Buttons/ButtonGlobal';
import { useAuth } from '../../Auth/Context/AuthContext';
import ExpandableRow from '../ExpansableRow/ExpansableRow';
import { UpArrowIcon } from '../Icons/UpArrow';
import { DownArrowIcon } from '../Icons/DownArrow';

const Sidebar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [openSection, setOpenSection] = useState(null); // Controle dos menus expansíveis
    const dropdownRef = useRef(null);
    const { logout } = useAuth();

    // Fecha o dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="Sidebar">
            <div className="Sidebar-title">Plenna</div>
            <div className="Sidebar-components">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/categories">Categorias</Link>
                <div
                    className="Sidebar-section-title"
                    onClick={() => toggleSection('financeiro')}
                    style={{ cursor: 'pointer', color: openSection === 'financeiro' ? '#007BFF' : 'inherit' }}
                >
                    Financeiro {openSection === 'financeiro' ? <UpArrowIcon /> : <DownArrowIcon />}
                </div>

                <ExpandableRow isOpen={openSection === 'financeiro'}>
                    <div className="Sidebar-submenu">
                        <Link to="/expenses">Despesas</Link>
                        <Link to="/revenues">Receitas</Link>
                        <Link to="/bank-accounts">Contas Bancárias</Link>
                        <Link to="/invoices">Faturas</Link>
                    </div>
                </ExpandableRow>
            </div>
            <div className='Sidebar-footer'>
                <div className='Sidebar-footer-itens' ref={dropdownRef} style={{ position: 'relative' }}>
                    <div></div>
                    <BotaoGlobal cor='nenhuma' onClick={() => setDropdownOpen((open) => !open)}>
                        <UserSettingsIcon />
                    </BotaoGlobal>
                    {dropdownOpen && (
                        <div className="dropdown-up">
                            <button>Perfil</button>
                            <button>Configurações</button>
                            <button onClick={logout}>Sair</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;