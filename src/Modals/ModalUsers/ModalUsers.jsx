import GenericModal from '../../Components/GenericModal/GenericModal';

export const ModalUsers = ({
    setIsModalOpen,
    handleSaveUser,
    newUser,
    setNewUser,
    editingUser,
    setEditingUser
}) => {
    const handleCancel = () => {
        setNewUser({ name: '', email: '', username: '', role: 'user' });
        setEditingUser(null);
        setIsModalOpen(false);
    };

    const formFields = [
        {
            fields: [
                {
                    id: 'name',
                    label: 'Nome',
                    type: 'text',
                    value: newUser.name,
                    onChange: (value) => setNewUser({ ...newUser, name: value }),
                    required: true,
                    size: 'full-width'
                }
            ]
        },
        {
            fields: [
                {
                    id: 'email',
                    label: 'E-mail',
                    type: 'email',
                    value: newUser.email,
                    onChange: (value) => setNewUser({ ...newUser, email: value }),
                    required: true,
                    size: 'full-width'
                }
            ]
        },
        {
            fields: [
                {
                    id: 'username',
                    label: 'Usuário',
                    type: 'text',
                    value: newUser.username,
                    onChange: (value) => setNewUser({ ...newUser, username: value }),
                    required: true,
                    size: 'full-width'
                }
            ]
        },
        {
            fields: [
                {
                    id: 'role',
                    label: 'Cargo',
                    type: 'select',
                    value: newUser.role,
                    onChange: (value) => setNewUser({ ...newUser, role: value }),
                    required: true,
                    size: 'full-width',
                    options: [
                        { value: 'admin', label: 'Admin' },
                        { value: 'user', label: 'Usuário' }
                    ]
                }
            ]
        }
    ];

    return (
        <GenericModal
            isOpen={true}
            title={editingUser ? 'Editar usuário' : 'Adicionar usuário'}
            formFields={formFields}
            onSubmit={handleSaveUser}
            onCancel={handleCancel}
            submitButtonText={editingUser ? 'Salvar' : 'Adicionar'}
            width="600px"
        />
    );
};

