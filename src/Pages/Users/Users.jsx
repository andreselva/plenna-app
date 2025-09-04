import { useState } from 'react';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import styles from './Users.module.css';
import { UsersManager } from '../../Hooks/UsersManager/UsersManager';
import { useAuth } from '../../Auth/Context/AuthContext';
import avatarUrl from '../../assets/avatar-padrao.svg';
import { ModalUsers } from '../../Modals/ModalUsers/ModalUsers';

const Users = () => {
    const { user: currentUser } = useAuth();
    const { users, loading, addUser, updateUser } = UsersManager();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', username: '', role: 'user' });
    const [editingUser, setEditingUser] = useState(null);

    const handleSaveUser = () => {
        if (editingUser) {
            updateUser(newUser);
            setEditingUser(null);
        } else {
            addUser(newUser);
        }
        setIsModalOpen(false);
        setNewUser({ name: '', email: '', username: '', role: 'user' });
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setNewUser(user);
        setIsModalOpen(true);
    };

    const handleOpenNewModal = () => {
        setEditingUser(null);
        setNewUser({ name: '', email: '', username: '', role: 'user' });
        setIsModalOpen(true);
    };

    const visibleUsers = currentUser?.role === 'admin'
        ? users
        : users.filter((u) => u.id === currentUser?.id);

    return (
        <div className={globalStyles.container}>
            <div className={globalStyles['container-content']}>
                <div className={globalStyles['content-title']}>
                    <div className={globalStyles['content-title-items']}>
                        <div className={globalStyles['content-title-items-left']}>
                            <button className={globalStyles['title-items-button']} onClick={handleOpenNewModal} />
                            <span className={globalStyles['title-items-span']}>Usuários</span>
                        </div>
                    </div>
                </div>
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <div className={styles.usersGrid}>
                        {visibleUsers.map((user) => (
                            <div
                                key={user.id}
                                className={styles.userCard}
                                onClick={() => handleEditUser(user)}
                            >
                                <img
                                    src={avatarUrl}
                                    alt={`Avatar de ${user.name}`}
                                    className={styles.avatar}
                                />
                                <div>
                                    <h3>{user.name}</h3>
                                    <p>{user.email}</p>
                                    <p>{user.username}</p>
                                    <p>{user.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {isModalOpen && (
                <ModalUsers
                    setIsModalOpen={setIsModalOpen}
                    handleSaveUser={handleSaveUser}
                    newUser={newUser}
                    setNewUser={setNewUser}
                    editingUser={editingUser}
                    setEditingUser={setEditingUser}
                />
            )}
        </div>
    );
};

export default Users;
