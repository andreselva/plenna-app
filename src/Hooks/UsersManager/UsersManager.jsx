import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import AlertToast from '../../Components/Alerts/AlertToast';

const endpoint = '/management';
export const UsersManager = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const { data: response, status } = await axiosInstance.get(`${endpoint}/users`)

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

    const addUser = async (user) => {
        setLoading(true);
        try {
            const { data: response, status } = await axiosInstance.post(endpoint, user);
            if (response && status >= 200 && status <= 204) {
                setUsers([...users, {...response.payload.user}])
                AlertToast({ icon: 'success', title: 'Usuário cadastrado com sucesso!'})
                return;
            }
            console.error(response, status);
            throw new Error(`Ocorreu um erro ao tentar cadastrar um novo usuário. Verifique o console.`);
        } catch (err) {
            const errorMessage = err?.response?.data?.message;
            AlertToast({icon: 'error', title: errorMessage, timer: 4000})
        } finally {
            setLoading(false)
        }
    };

    const updateUser = (user) => {
        setUsers(users.map((u) => (u.id === user.id ? user : u)));
    };

    return { users, loading, error: null, addUser, updateUser };
};
