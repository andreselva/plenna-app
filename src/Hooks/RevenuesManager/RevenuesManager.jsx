import {useState} from 'react';

export const RevenuesManager = () => {
    const [revenues, setRevenues] = useState([
        {id: 1, name: 'Receita 1', description: 'Descrição 1', value: 200, pay: '03/2025', categoryId: 2},
        {id: 2, name: 'Receita 2', description: 'Descrição 2', value: 200, pay: '03/2025', categoryId: 2},
        {id: 3, name: 'Receita 3', description: 'Descrição 3', value: 200, pay: '03/2025', categoryId: 4},
        {id: 4, name: 'Receita 4', description: 'Descrição 4', value: 200, pay: '03/2025', categoryId: 4},
    ]);

    const addRevenue = (revenue) => {
        const newRevenue = {...revenue, id: Date.now()};
        setRevenues((oldRevenues) => [...oldRevenues, newRevenue]);
    };

    const deleteRevenue = (id) => {
        setRevenues((oldRevenues) => oldRevenues.filter((revenue) => revenue.id !== id));
    };

    const updateRevenue = (id, updatedRevenue) => {
        setRevenues((oldRevenues) =>
            oldRevenues.map((revenue) => (revenue.id === id ? {...revenue, ...updatedRevenue} : revenue))
        );
    };

    return {revenues, addRevenue, deleteRevenue, updateRevenue};
};
