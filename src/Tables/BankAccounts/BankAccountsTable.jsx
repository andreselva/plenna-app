import globalStyles from '../../Styles/GlobalStyles.module.css';

export const BankAccountsTable = ({ accounts, onEdit, handleDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Conta</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {accounts.length > 0 ? (
                    accounts.map((account) => (
                        <tr>
                            <td>{account.name}</td>
                            <td className={globalStyles.actions}>
                                <button className={globalStyles['action-button']} onClick={() => onEdit(account)}>Editar</button>
                                <button className={globalStyles['action-button']} onClick={() => handleDelete(account.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="2">Nenhuma conta bancária cadastrada</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}