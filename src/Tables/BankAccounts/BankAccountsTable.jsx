import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import globalStyles from '../../Styles/GlobalStyles.module.css';

export const BankAccountsTable = ({ accounts, onEdit, onDelete }) => {
    const handleDelete = DeleteConfirmation(onDelete, {
        confirmTitle: 'Deseja realmente excluir?',
        confirmText: 'A exclusão é definitiva!',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Manter',
        successMessage: 'Conta excluída!',
        errorMessage: 'Falha ao remover conta!'
    });

    const columns = [
        {
            header: 'Conta',
            accessor: 'name',
            style: { flex: '3 1 0%' }
        },
        {
            header: 'Ações',
            style: { flex: '1 1 120px', display: 'flex', justifyContent: 'center' },
            renderCell: (account) => (
                <div className={globalStyles.actions}>
                    <button onClick={() => onEdit(account)}>Editar</button>
                    <button onClick={() => handleDelete(account.id)}>Excluir</button>
                </div>
            )
        }
    ];

    return (
        <FlexibleTable
            columns={columns}
            data={accounts}
            noDataMessage="Nenhuma conta bancária cadastrada"
        />
    );
}