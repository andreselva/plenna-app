export const BankAccountsTable = ({ accounts }) => {
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
                            <td>{account.nome}</td>
                            <td className="actions">
                                <button className="action-button">Editar</button>
                                <button className="action-button">Excluir</button>
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