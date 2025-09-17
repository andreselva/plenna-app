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

    const deleteUser = async (userId) => {
        setLoading(true);
        try {
            const { data: response, status } = await axiosInstance.delete(`${endpoint}/users/${userId}`);

            if (response && status >= 200 && status <= 204) {
                setUsers(users.filter(user => user.id !== userId));
                AlertToast({ icon: 'success', title: 'Usuário excluído com sucesso!'});
                return;
            }
            console.error(response, status);
            throw new Error(`Ocorreu um erro durante a exclusão do usuário. Verifique o console.`);
        } catch (err) {
            const errorMessage = err?.response?.data?.message;
            AlertToast({ icon: 'error', title: errorMessage, timer: 4000})
        } finally {
            setLoading(false);
        }
    }

    const updateUser = async (user) => {
        setLoading(true)
        try {
            const { data: response, status } = await axiosInstance.put(`${endpoint}/users`, user);
            if (response && status >= 200 && status <= 204) {
                AlertToast({ icon: 'success', title: 'Usuário alterado com sucesso!'});
                setUsers(response.payload.users);
                return;
            }

            console.error(response, status);
            throw new Error(`Ocorreu um erro ao editar o usuário. Verifique o console.`);
        } catch (err) {
            const errorMessage = err?.response?.data?.message;
            AlertToast({ icon: 'error', title: errorMessage });
        } finally {
            setLoading(false);
        };
    };

    return { users, loading, error: null, addUser, updateUser, deleteUser };
};
