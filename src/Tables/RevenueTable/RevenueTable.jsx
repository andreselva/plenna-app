import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import globalStyles from '../../Styles/GlobalStyles.module.css';

const RevenueTable = ({ revenues = [], categories = [], onEdit, onDelete }) => {
    const handleDelete = DeleteConfirmation(onDelete, {
        confirmTitle: 'Deseja realmente excluir?',
        confirmText: 'A exclusão é definitiva!',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Manter',
        successMessage: 'Despesa excluída!',
        errorMessage: 'Erro ao excluir despesa!'
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Vencimento</th>
                    <th>Categoria</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {revenues.length > 0 ? (
                    revenues.map((revenue) => {
                        const category = categories.find(cat => cat.id === revenue.idCategory) || {};
                        return (
                            <tr key={revenue.id}>
                                <td>{revenue.name}</td>
                                <td>{revenue.value}</td>
                                <td>{revenue.invoiceDueDate.split('-').reverse().join('/')}</td>
                                <td>
                                    <span
                                        style={{
                                            backgroundColor: category.color ? category.color + "33" : "#000",
                                            color: "#000",
                                            fontSize: '15px',
                                            padding: "4px 8px",
                                            borderRadius: "10px",
                                            display: "inline-block",
                                        }}
                                    >
                                        {category.name || 'Categoria não encontrada'}
                                    </span>
                                </td>
                                <td className={globalStyles.actions}>
                                    <button
                                        className={globalStyles['action-button']}
                                        onClick={() => onEdit(revenue)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className={globalStyles['action-button']}
                                        onClick={() => handleDelete(revenue)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="5">Nenhuma receita cadastrada</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
};

export default RevenueTable;