import { useNavigate } from 'react-router-dom';
import GenericModal from '../../Components/GenericModal/GenericModal';
import './ModalSettings.css';

const settingsOptions = [
    { label: 'Usuários', path: '/users' }
];

const ModalSettings = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
        onClose();
    };

    return (
        <GenericModal
            isOpen={isOpen}
            title="Configurações"
            onCancel={onClose}
            hideSubmitButton
            cancelButtonText="Fechar"
            width="400px"
            height='300px'
        >
            <ul className="settings-list">
                {settingsOptions.map((option) => (
                    <li key={option.path}>
                        <button
                            type="button"
                            className="settings-item"
                            onClick={() => handleNavigate(option.path)}
                        >
                            {option.label}
                        </button>
                    </li>
                ))}
            </ul>
        </GenericModal>
    );
};

export default ModalSettings;
