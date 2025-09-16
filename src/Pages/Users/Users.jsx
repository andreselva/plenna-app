// pages/Management/Users.jsx
import { useState } from 'react';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import styles from './Users.module.css';
import { UsersManager } from '../../Hooks/UsersManager/UsersManager';
import { useAuth } from '../../Auth/Context/AuthContext';
import avatarUrl from '../../assets/avatar-padrao.svg';
import { ModalUsers } from '../../Modals/ModalUsers/ModalUsers';
import Loader from '../../Components/Loader/Loader';
import { Pencil, Shield, Trash2 } from 'lucide-react'; // lucide icons
import AlertToast from '../../Components/Alerts/AlertToast';
import ModalPasswordReset from '../../Modals/ModalUsers/ModalPasswordReset';

const Users = () => {
  const { user: currentUser } = useAuth();
  const { users, loading, addUser, updateUser, deleteUser } = UsersManager();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', username: '', role: 'user' });
  const [editingUser, setEditingUser] = useState(null);

  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedUserForReset, setSelectedUserForReset] = useState(null);

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

  const handleOpenReset = (e, user) => {
    e.stopPropagation(); // evita disparar onClick do card (edição)
    setSelectedUserForReset(user);
    setShowResetModal(true);
  };

  const handleDelete = async (e, user) => {
    e.stopPropagation(); // evita abrir edição
    const confirmed = window.confirm(`Excluir o usuário "${user.name}"? Esta ação não pode ser desfeita.`);
    if (!confirmed) return;
    try {
      await deleteUser(user.id);
      AlertToast({ icon: 'success', title: 'Usuário excluído com sucesso!' });
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Erro ao excluir usuário.';
      AlertToast({ icon: 'error', title: errorMessage, timer: 4000 });
    }
  };

  const visibleUsers = currentUser?.role === 'admin'
    ? users
    : users.filter((u) => u.id === currentUser?.id);

  if (loading) {
    return <Loader />
  }

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles['container-content']}>
        <div className={globalStyles['content-title']}>
          <div className={globalStyles['content-title-items']}>
            <div className={globalStyles['content-title-items-left']}>
              <button
                className={globalStyles['title-items-button']}
                onClick={handleOpenNewModal}
                title="Adicionar novo usuário"
              />
              <span className={globalStyles['title-items-span']}>Usuários</span>
            </div>
          </div>
        </div>

        <div className={globalStyles['card-users']}>
          <div className={styles.usersGrid}>
            {visibleUsers.map((user) => (
              <div
                key={user.id}
                className={styles.userCardWrapper}
              >
                <div className={styles.cardActions}>
                  <button
                    className={styles.iconButton}
                    title="Editar"
                    onClick={(e) => { e.stopPropagation(); handleEditUser(user); }}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    className={styles.iconButton}
                    title="Alterar senha"
                    onClick={(e) => handleOpenReset(e, user)}
                  >
                    <Shield size={18} />
                  </button>
                  {currentUser.role === 'admin' && (
                    <button
                      className={`${styles.iconButton} ${styles.danger}`}
                      title="Excluir"
                      onClick={(e) => handleDelete(e, user)}
                    >
                    <Trash2 size={18} />
                  </button>)}
                </div>

                <div
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
                    <p>{user.role === 'admin' ? 'Administrador' : 'Usuário'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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

      {showResetModal && (
        <ModalPasswordReset
          isOpen={showResetModal}
          onClose={() => { setShowResetModal(false); setSelectedUserForReset(null); }}
          user={selectedUserForReset}
        />
      )}
    </div>
  );
};

export default Users;
