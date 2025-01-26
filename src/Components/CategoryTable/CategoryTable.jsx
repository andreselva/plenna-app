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
                    <td style={{color: category.color}}>{category.name}</td>
                    <td>{category.type}</td>
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
