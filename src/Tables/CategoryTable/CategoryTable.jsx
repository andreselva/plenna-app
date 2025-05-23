import React from 'react';
import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';

const CategoryTable = ({ categories, onEdit, onDelete }) => {
    const handleDelete = DeleteConfirmation(onDelete, {
        confirmTitle: 'Deseja realmente excluir?',
        confirmText: 'A exclusão é definitiva!',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Manter',
        successMessage: 'Categoria excluída!',
        errorMessage: 'Falha ao remover categoria!'
    });

    const columns = [
        {
            header: 'Nome da Categoria',
            style: { flex: '2 1 0%' },
            renderCell: (category) => (
                <span className={globalStyles.statusBadge} style={{
                    backgroundColor: `${category.color}33`
                }}>
                    {category.name}
                </span>
            )
        },
        {
            header: 'Tipo',
            style: { flex: '1 1 0%' },
            renderCell: (category) => (
                <span className={globalStyles.statusBadge} style={{
                    backgroundColor: category.type.toUpperCase() === 'RECEITA' ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)"
                }}>
                    {category.type}
                </span>
            )
        },
        {
            header: 'Ações',
            style: { flex: '1 1 120px' },
            renderCell: (category) => (
                <div className={globalStyles.actions}>
                    <button className={globalStyles['action-button']} onClick={() => onEdit(category)}>Editar</button>
                    <button className={globalStyles['action-button']} onClick={() => handleDelete(category.id)}>Excluir</button>
                </div>
            )
        }
    ];

    return (
        <FlexibleTable
            columns={columns}
            data={categories}
            noDataMessage="Nenhuma categoria cadastrada"
        />
    );
};

export default CategoryTable;