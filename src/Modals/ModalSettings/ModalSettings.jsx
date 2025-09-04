import { useState } from 'react';
import GenericModal from '../../Components/GenericModal/GenericModal';
import './ModalSettings.css';

const ModalSettings = ({ isOpen, onClose }) => {
    const [activeSection, setActiveSection] = useState('users');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = () => {
        onClose();
    };

    return (
        <GenericModal
            isOpen={isOpen}
            title="Configurações"
            onSubmit={handleSubmit}
            onCancel={onClose}
            width="800px"
        >
            <div className="settings-modal">
                <aside className="settings-sidebar">
                    <button
                        type="button"
                        className={`settings-sidebar-item ${activeSection === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveSection('users')}
                    >
                        Usuários
                    </button>
                </aside>
                <div className="settings-content">
                    {activeSection === 'users' && (
                        <form>
                            <div className="form-group full-width">
                                <label htmlFor="settings-name">Nome</label>
                                <input
                                    id="settings-name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="settings-email">Email</label>
                                <input
                                    id="settings-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="settings-username">Username</label>
                                <input
                                    id="settings-username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="settings-role">Cargo</label>
                                <select
                                    id="settings-role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Selecione</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">Usuário</option>
                                </select>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </GenericModal>
    );
};

export default ModalSettings;

