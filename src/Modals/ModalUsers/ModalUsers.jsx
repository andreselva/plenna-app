import GenericModal from '../../Components/GenericModal/GenericModal';
import { Role } from '../../enum/roles.enum';

export const ModalUsers = ({
    setIsModalOpen,
    handleSaveUser,
    newUser,
    setNewUser,
    editingUser,
    setEditingUser
}) => {
    const handleCancel = () => {
        setNewUser({ name: '', email: '', username: '', role: 'normal-user', password: '' });
        setEditingUser(null);
        setIsModalOpen(false);
    };

    let formFields = [
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
                },
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
    ];

    if (!editingUser) {
        formFields.push(
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
                },
                {
                    id: 'password',
                    label: 'Senha',
                    type: 'password',
                    value: newUser.password,
                    onChange: (value) => setNewUser({...newUser, password: value}),
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
                        { value: Role.NORMAL_USER, label: 'Usuário' },
                        { value: Role.ADMIN, label: 'Administrador' },
                    ]
                }
            ]
        });
    } else {
        formFields.push(
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
                    },
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
                            { value: 'admin', label: 'Administrador' },
                            { value: 'normal-user', label: 'Usuário' }
                        ]
                    }
                ]
            });
    }

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

