import { BanknoteXIcon, HandCoins, Pencil, ReceiptText, Trash2 } from 'lucide-react';
import { ActionDropdown } from '../../Components/ActionDropdown/ActionDropdown';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { darkenHexColor } from '../../Utils/DarkenColor';
import { useBreakpoints } from '../../Hooks/useMediaQuery/useBreakpoints';
import { STATUS_COLORS } from '../../Types/status.color';
import { RevenueTableSkeleton } from '../../Pages/Revenues/RevenueTableSkeleton';

const RevenueTable = ({
    revenues = [],
    categories = [],
    accounts = [],
    customers = [],
    paymentMethods = [],
    onEdit,
    onDelete,
    loading,
    handleOpenPaymentModal,
    onReversePayment,
    onGenerateCharge
}) => {
    const { isMobile } = useBreakpoints();

    if (loading) {
        return <RevenueTableSkeleton />;
    }

    const handleDelete = DeleteConfirmation(onDelete, {
        confirmTitle: 'Deseja realmente excluir?',
        confirmText: 'A exclusão é definitiva!',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Manter',
        successMessage: 'Receita excluída!',
        errorMessage: 'Erro ao excluir receita!'
    });

    const columns = [
        {
            header: 'Descrição',
            accessor: 'name',
            style: { flex: '1 1 20%', display: 'flex', justifyContent: 'center' },
        },
        {
            header: 'Cliente',
            renderCell: (revenue) => {
                const customer = customers.find((item) => Number(item.id) === Number(revenue.idCustomer ?? revenue.customerId)) || {};
                return customer.name || revenue.customerName || '-';
            },
            style: { flex: '1 1 10%', display: 'flex', justifyContent: 'center' },
        },

    ];

    if (!isMobile) {
        columns.push(
            // {
            //     header: 'Categoria',
            //     renderCell: (revenue) => {
            //         const category = categories.find((cat) => cat.id === revenue.idCategory);
            //         if (category && category.color) {
            //             return (
            //                 <span
            //                     className={globalStyles.statusBadge}
            //                     style={{
            //                         backgroundColor: `${category.color}33`,
            //                         color: darkenHexColor(category.color, 25),
            //                         padding: '4px 10px'
            //                     }}
            //                 >
            //                     {category.name}
            //                 </span>
            //             );
            //         }
            //         return category ? category.name : '-';
            //     },
            //     style: { flex: '1 1 20%', display: 'flex', justifyContent: 'center' },
            // },

            {
                header: 'Conta bancária',
                renderCell: (revenue) => {
                    const bankAccount = accounts.find((account) => Number(account.id) === Number(revenue.idBankAccount)) || {};
                    return bankAccount.name || '-';
                },
                style: { flex: '1 1 10%', display: 'flex', justifyContent: 'center' },
            },
            {
                header: 'Valor',
                accessor: 'value',
                style: { flex: '1 1 10%', display: 'flex', justifyContent: 'center' },
                renderCell: (revenue) => "R$ " + (revenue.value ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
            },
            {
                header: 'Vencimento',
                renderCell: (revenue) => (revenue.invoiceDueDate ? revenue.invoiceDueDate.split('-').reverse().join('/') : '-'),
                style: { flex: '1 1 10%', display: 'flex', justifyContent: 'center' },
            },
            {
                header: 'Status',
                renderCell: (revenue) => {
                    const statusMap = {
                        pending: 'Pendente',
                        paid: 'Paga',
                        partial: 'Parcial',
                        cancelled: 'Cancelada',
                        reversed: 'Estornada'
                    };
                    const baseColor = STATUS_COLORS[revenue.status] || STATUS_COLORS.default;
                    return (
                        <span
                            className={globalStyles.statusBadge}
                            style={{
                                backgroundColor: `${baseColor}33`,
                                color: darkenHexColor(baseColor, 25),
                                padding: '4px 10px'
                            }}
                        >
                            {statusMap[revenue.status] || '-'}
                        </span>
                    );
                },
                style: { flex: '1 1 10%', display: 'flex', justifyContent: 'center' },
            }
        );
    }

    columns.push({
        header: 'Ações',
        renderCell: (revenue) => {
            const revenueActions = [
                {
                    icon: <Pencil size={14} />,
                    text: 'Editar',
                    handler: () => onEdit(revenue)
                },
                {
                    icon: <Trash2 size={14} />,
                    text: 'Excluir',
                    handler: () => handleDelete(revenue)
                },
            ];

            if (!revenue.idInvoice && revenue.status !== 'paid') {
                revenueActions.push({ icon: <HandCoins size={14} />, label: 'Registrar recebimento', handler: () => handleOpenPaymentModal(revenue) });
            }

            if (!revenue.idInvoice && (revenue.status === 'paid' || revenue.status === 'partial')) {
                revenueActions.push({ icon: <BanknoteXIcon size={14} />, label: 'Gerenciar recebimentos', handler: () => onReversePayment(revenue) });
            }

            if (!revenue.idCharge && revenue.status === 'pending') {
                revenueActions.push({
                    icon: <ReceiptText size={14} />,
                    text: 'Gerar cobrança',
                    handler: () => onGenerateCharge(revenue)
                });
            }

            return <ActionDropdown actions={revenueActions} />;
        },
        style: { flex: '1 1 10%', display: 'flex', justifyContent: 'center' },
    });

    return <FlexibleTable columns={columns} data={revenues} noDataMessage="Nenhuma conta a receber cadastrada" />;
};

export default RevenueTable;
