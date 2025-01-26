const ExpenseTable = ({ expenses = [], categories = [], onEdit, onDelete }) => (
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
                const category = categories.find(category => category.id == expense.categoryId); // Encontrar categoria
                return (
                    <tr key={expense.id}>
                        <td>{expense.description}</td>
                        <td>{expense.value}</td>
                        <td>{expense.pay}</td>
                        <td>{category ? category.name : 'Categoria não encontrada'}</td>

                        <td className="actions">
                            <button onClick={() => onEdit(expense)}>Editar</button>
                            <button onClick={() => onDelete(expense.id)}>Excluir</button>
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

export default ExpenseTable;