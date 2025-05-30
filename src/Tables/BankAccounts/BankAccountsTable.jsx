import { ActionDropdown } from '../../Components/ActionDropdown/ActionDropdown';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';

export const BankAccountsTable = ({ accounts, onEdit, onDelete, generateInvoices }) => {
    const handleDeleteWithConfirmation = DeleteConfirmation(onDelete, {
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
            style: { flex: '2 1 0%' }
        },
        {
            header: 'Gera fatura',
            style: { flex: '2 1 0%' },
            renderCell: (account) => {
                return account.generateInvoice ? 'Sim' : 'Não'
            }
        },
        {
            header: 'Ações',
            style: { flex: '1 1 120px', display: 'flex', justifyContent: 'center' },
            renderCell: (account) => {
                let accountActions = [
                    {
                        label: 'Editar',
                        handler: () => onEdit(account)
                    },
                    {
                        label: 'Excluir',
                        handler: () => handleDeleteWithConfirmation(account.id)
                    },
                ];

                //Só mostra a opção de gerar faturas caso a conta possua essa opção habilitada
                if (account.generateInvoice) {
                    accountActions.push({
                        label: 'Gerar faturas',
                        handler: () => generateInvoices([{ idAccount: account.id, dueDate: account.dueDate, closingDate: account.closingDate }]
                        )
                    })
                }

                return (
                    <ActionDropdown
                        actions={accountActions}
                    />
                );
            }
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