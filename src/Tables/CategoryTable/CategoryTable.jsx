import React from 'react';
import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import globalStyles from '../../Styles/GlobalStyles.module.css';

const CategoryTable = ({ categories, onEdit, onDelete }) => {
    const handleDelete = DeleteConfirmation(onDelete, {
        confirmTitle: 'Deseja realmente excluir?',
        confirmText: 'A exclusão é definitiva!',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Manter',
        successMessage: 'Categoria excluída!',
        errorMessage: 'Falha ao remover categoria!'
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Nome da Categoria</th>
                    <th>Tipo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <tr key={category.id}>
                            <td>
                                <span
                                    style={{
                                        backgroundColor: category.color + "33",
                                        color: "#000",
                                        fontSize: '15px',
                                        padding: "4px 8px",
                                        borderRadius: "10px",
                                        display: "inline-block",
                                    }}
                                >
                                    {category.name}
                                </span>
                            </td>
                            <td>
                                <span
                                    style={{
                                        backgroundColor: category.type.toUpperCase() === 'RECEITA' ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)",
                                        color: "#000",
                                        fontSize: '15px',
                                        padding: "4px 8px",
                                        borderRadius: "10px",
                                        display: "inline-block",
                                    }}
                                >
                                    {category.type}
                                </span>
                            </td>

                            <td className={globalStyles.actions}>
                                <button className={globalStyles['action-button']} onClick={() => onEdit(category)}>Editar</button>
                                <button className={globalStyles['action-button']} onClick={() => handleDelete(category.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">Nenhuma categoria cadastrada</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default CategoryTable;
