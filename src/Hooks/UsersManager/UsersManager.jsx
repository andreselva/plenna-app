import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import AlertToast from '../../Components/Alerts/AlertToast';

// TODO: substituir pelo endpoint da API quando disponível
const mockUsers = [
    { id: 1, name: 'Admin', email: 'admin@example.com', username: 'admin', role: 'admin' },
    { id: 2, name: 'Usuário', email: 'user@example.com', username: 'user', role: 'user' },
    { id: 2, name: 'Usuário', email: 'user@example.com', username: 'user', role: 'user' },
    { id: 2, name: 'Usuário', email: 'user@example.com', username: 'user', role: 'user' },
    { id: 2, name: 'Usuário', email: 'user@example.com', username: 'user', role: 'user' }


];

const endpoint = '/management';
export const UsersManager = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = () => {
            setLoading(true);
            try {
                const { data: response, status } = axiosInstance.get(`${endpoint}/users`)

                if (response && status >= 200 && status <= 204) {
                    setUsers(response.payload.users);
                    return;
                }
            } catch (err) {
                const errorMessage = err?.response?.data?.message;
                AlertToast({icon: 'error', title: errorMessage, timer: 4000})
            } finally {
                setLoading(false)
            }
        }
        fetchUsers();
    }, [])

    const addUser = (user) => {
        const nextId = Math.max(0, ...users.map((u) => u.id)) + 1;
        setUsers([...users, { ...user, id: nextId }]);
    };

    const updateUser = (user) => {
        setUsers(users.map((u) => (u.id === user.id ? user : u)));
    };

    return { users, loading, error: null, addUser, updateUser };
};
