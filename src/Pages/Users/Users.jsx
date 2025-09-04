import globalStyles from '../../Styles/GlobalStyles.module.css';
import styles from './Users.module.css';
import { UsersManager } from '../../Hooks/UsersManager/UsersManager';
import { useAuth } from '../../Auth/Context/AuthContext';

const Users = () => {
    const { user: currentUser } = useAuth();
    const { users, loading } = UsersManager();

    const visibleUsers = currentUser?.role === 'admin'
        ? users
        : users.filter((u) => u.id === currentUser?.id);

    return (
        <div className={globalStyles.container}>
            <div className={globalStyles['container-content']}>
                <div className={globalStyles['content-title']}>
                    <div className={globalStyles['content-title-items']}>
                        <span className={globalStyles['title-items-span']}>Usuários</span>
                    </div>
                </div>
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <div className={styles.usersGrid}>
                        {visibleUsers.map((user) => (
                            <div key={user.id} className={styles.userCard}>
                                <h3>{user.name}</h3>
                                <p>{user.email}</p>
                                <p>{user.username}</p>
                                <p>{user.role}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
