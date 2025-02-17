const RevenueTable = ({revenues = [], categories = [], onEdit, onDelete}) => (
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
                const category = categories.find(category => category.id == revenue.categoryId);
                return (
                    <tr key={revenue.id}>
                        <td>{revenue.name}</td>
                        <td>{revenue.value}</td>
                        <td>{revenue.pay}</td>
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
                                {category ? category.name : 'Categoria não encontrada'}
                            </span>
                        </td>

                        <td className="actions">
                            <button onClick={() => onEdit(revenue)}>Editar</button>
                            <button onClick={() => onDelete(revenue.id)}>Excluir</button>
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

export default RevenueTable;