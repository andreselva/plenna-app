const ExpenseTable = ({expenses = [], categories = [], onEdit, onDelete}) => (
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
                const category = categories.find(category => category.id === expense.categoryId) || {};

                return (
                    <tr key={expense.id}>
                        <td>{expense.name}</td>
                        <td>{expense.value}</td>
                        <td>{expense.pay}</td>

                        <td>
                            <span
                                style={{
                                    backgroundColor: category.color + "33" || '#000',
                                    color: "#000",
                                    fontSize: '15px',
                                    padding: "4px 8px",
                                    borderRadius: "10px",
                                    display: "inline-block",
                                }}
                            >
                                {category ? category.name : 'Categoria não encontrada'}
                            </span>
                        </td>

                        <td className="actions">
                            <button onClick={() => onEdit(expense)}>Editar</button>
                            <button onClick={() => onDelete(expense.id)}>Excluir</button>
                        </td>
                    </tr>
                )
                    ;
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