import { useState, useMemo } from 'react';
import GenericModal from '../../Components/GenericModal/GenericModal';
import AlertToast from '../../Components/Alerts/AlertToast';
import usePasswordReset from '../../Hooks/UsersManager/usePasswordReset';

export default function ModalPasswordReset({
  isOpen,
  onClose,
  user,
}) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const { resetLoading, resetPassword } = usePasswordReset();

  const formFields = useMemo(
    () => [
      {
        title: 'Redefinir senha',
        fields: [
          {
            id: 'old-password',
            label: 'Senha atual',
            type: 'password',
            value: oldPassword,
            onChange: setOldPassword,
            required: true,
            size: 'full-width'
          },
        ]
    },
    {
        fields: [
        {
            id: 'new-password',
            label: 'Nova senha',
            type: 'password',
            value: password,
            onChange: setPassword,
            required: true,
            size: 'full-width',
        },
        {
            id: 'confirm-password',
            label: 'Confirmar nova senha',
            type: 'password',
            value: confirm,
            onChange: setConfirm,
            required: true,
            size: 'full-width',
        },
        ],
      }
    ],
    [password, confirm, oldPassword]
  );

  const handleSubmit = async () => {
    if (!password || !confirm) {
      AlertToast({
        icon: 'warning',
        title: 'Informe e confirme a nova senha.',
        timer: 4000,
      });
      return;
    }
    if (password !== confirm) {
      AlertToast({
        icon: 'error',
        title: 'As senhas não coincidem.',
        timer: 4000,
      });
      return;
    }
    if (!user?.id) {
      AlertToast({
        icon: 'error',
        title: 'Usuário inválido para redefinição.',
        timer: 4000,
      });
      return;
    }

    const { ok, error } = await resetPassword({
      userId: user.id,
      password,
      oldPassword
    });

    if (ok) {
      AlertToast({
        icon: 'success',
        title: 'Senha redefinida com sucesso!',
      });
      onClose?.();
      return;
    }

    AlertToast({
      icon: 'error',
      title: error || 'Erro ao redefinir senha.',
      timer: 4000,
    });
  };

  const handleCancel = () => {
    onClose?.();
  };

  return (
    <GenericModal
      isOpen={isOpen}
      title={`Redefinir senha – ${user?.name || user?.username || 'Usuário'}`}
      formFields={formFields}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      submitButtonText="Redefinir"
      cancelButtonText="Cancelar"
      width="520px"
      loading={resetLoading}
    />
  );
}
