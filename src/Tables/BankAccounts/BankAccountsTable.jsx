import { Pencil, ReceiptText, Trash2 } from 'lucide-react';
import { ActionDropdown } from '../../Components/ActionDropdown/ActionDropdown';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { darkenHexColor } from '../../Utils/DarkenColor';
import { BankAccountsTableSkeleton } from './BankAccountsTableSkeleton';

const INVOICE_STATUS_COLORS = {
    true: '#28a745',
    false: '#6c757d'
};

export const BankAccountsTable = ({ accounts, onEdit, onDelete, generateInvoices, loading, error }) => {
    if (loading) {
        return <BankAccountsTableSkeleton />;
    }

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
            style: { flex: '1 1 40%', display: 'flex', justifyContent: 'center' }
        },
        {
            header: 'Gera fatura',
            style: { flex: '1 1 30%', display: 'flex', justifyContent: 'center' },
            renderCell: (account) => {
                const text = account.generateInvoice ? 'Sim' : 'Não';
                const baseColor = INVOICE_STATUS_COLORS[account.generateInvoice];

                return (
                    <span className={globalStyles.statusBadge} style={{
                        backgroundColor: `${baseColor}33`,
                        color: darkenHexColor(baseColor, 25),
                        padding: '4px 10px'
                    }}>
                        {text}
                    </span>
                );
            }
        },
        {
            header: 'Ações',
            style: { flex: '1 1 30%', display: 'flex', justifyContent: 'center' },
            renderCell: (account) => {
                let accountActions = [
                    {
                        icon: <Pencil size={14} />,
                        text: 'Editar',
                        handler: () => onEdit(account)
                    },
                    {
                        icon: <Trash2 size={14} />,
                        text: 'Excluir',
                        handler: () => handleDeleteWithConfirmation(account.id)
                    },
                ];

                if (account.generateInvoice) {
                    accountActions.push({
                        icon: <ReceiptText size={14} />,
                        text: 'Gerar faturas',
                        handler: () => generateInvoices(
                            {
                                nameAccount: account.name,
                                idAccount: account.id,
                                dueDate: account.dueDate,
                                closingDate: account.closingDate
                            }
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