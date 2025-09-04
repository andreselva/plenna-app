import { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../api/axiosInstance';
import AlertToast from '../../Components/Alerts/AlertToast';

const endpoint = '/users';

export const UsersManager = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchUsers = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;
            setLoading(true);
            try {
                const { data: response, status } = await axiosInstance.get(endpoint);
                if (response && status >= 200 && status <= 204) {
                    setUsers(response.payload.users);
                    return;
                }
                throw new Error('Erro ao buscar usuários.');
            } catch (err) {
                const message = err?.response?.data?.message || 'Erro ao buscar usuários.';
                AlertToast({ icon: 'error', title: message });
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
};
