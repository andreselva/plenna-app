import globalStyles from '../../Styles/GlobalStyles.module.css';

export const CardsTable = ({ cards, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Cartão</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {cards.length > 0 ? (
                    cards.map((card) => (
                        <tr key={card.id}>
                            <td>{card.name}</td>
                            <td className={globalStyles.actions}>
                                <button className={globalStyles['action-button']} >Editar</button>
                                <button className={globalStyles['action-button']} >Excluir</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">Nenhum cartão cadastrado</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

