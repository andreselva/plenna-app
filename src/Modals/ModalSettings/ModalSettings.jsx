import { useNavigate } from 'react-router-dom';
import GenericModal from '../../Components/GenericModal/GenericModal';
import './ModalSettings.css';
import useModulesTree from '../../Hooks/useModulesTree/useModulesTree';
import { getSettingsRoutes } from '../../routes/routeAccess';

const ModalSettings = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { modulesTree } = useModulesTree();

  const settingsOptions = getSettingsRoutes(modulesTree).map((route) => ({
    label: route.meta?.label,
    path: route.path,
    icon: route.meta?.icon,
  }));

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
      width="auto"
      height="400px"
    >
      <ul className="settings-list">
        {settingsOptions.map((option) => (
          <li key={option.path}>
            <button
              type="button"
              className="settings-item"
              onClick={() => handleNavigate(option.path)}
            >
              {option.icon}
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </GenericModal>
  );
};

export default ModalSettings;