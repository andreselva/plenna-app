import { useState, useEffect } from 'react';

// TODO: substituir pelo endpoint da API quando disponível
const mockUsers = [
    { id: 1, name: 'Admin', email: 'admin@example.com', username: 'admin', role: 'admin' },
    { id: 2, name: 'Usuário', email: 'user@example.com', username: 'user', role: 'user' }
];

export const UsersManager = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simula busca na API
        setUsers(mockUsers);
        setLoading(false);
    }, []);

    return { users, loading, error: null };
};
