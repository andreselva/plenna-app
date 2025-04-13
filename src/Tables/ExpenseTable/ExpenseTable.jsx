import DeleteConfirmation from "../../Hooks/DeleteConfirmation/DeleteConfirmation";
import globalStyles from '../../Styles/GlobalStyles.module.css';

const ExpenseTable = ({ expenses = [], categories = [], onEdit, onDelete }) => {
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
                {expenses.length > 0 ? (
                    expenses.map((expense) => {
                        const category = categories.find(category => category.id === expense.idCategory) || {};

                        return (
                            <tr key={expense.id}>
                                <td>{expense.name}</td>
                                <td>{expense.value}</td>
                                <td>{expense.invoiceDueDate}</td>
                                <td>
                                    <span
                                        style={{
                                            backgroundColor: category.color ? category.color + "33" : '#000',
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
                                    <button className={globalStyles['action-button']} onClick={() => onEdit(expense)}>Editar</button>
                                    <button className={globalStyles['action-button']} onClick={() => handleDelete(expense.id)}>Excluir</button>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="5">Nenhuma despesa cadastrada</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default ExpenseTable;