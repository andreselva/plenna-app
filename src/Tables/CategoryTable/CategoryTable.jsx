const CategoryTable = ({categories, onEdit, onDelete}) => (
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
                                backgroundColor: category.type == 'Receita' ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)",
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

                    <td className="actions">
                        <button onClick={() => onEdit(category)}>Editar</button>
                        <button onClick={() => onDelete(category.id)}>Excluir</button>
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

export default CategoryTable;
