import { Pencil, Trash2, HandCoins, BanknoteXIcon } from 'lucide-react';
import { ActionDropdown } from '../../Components/ActionDropdown/ActionDropdown';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import { RevenueTableSkeleton } from '../../Pages/Revenues/RevenueTableSkeleton';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { darkenHexColor } from '../../Utils/DarkenColor';
import { useBreakpoints } from '../../Hooks/useMediaQuery/useBreakpoints';
import { STATUS_COLORS } from '../../Types/status.color';

const RevenueTable = ({ revenues = [], categories = [], onEdit, onDelete, loading, error, handleOpenPaymentModal, onReversePayment }) => {
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
            style: { flex: '1 1 35%', display: 'flex', justifyContent: 'center' },
        },
        {
            header: 'Valor',
            accessor: 'value',
            style: { flex: '1 1 15%', display: 'flex', justifyContent: 'center' },
        },
        
    ];

    if (!isMobile) {
        columns.push(
            {
                header: 'Categoria',
                renderCell: (revenue) => {
                    const category = categories.find(cat => cat.id === revenue.idCategory);
                    if (category && category.color) {
                        return (
                            <span className={globalStyles.statusBadge} style={{
                                backgroundColor: `${category.color}33`,
                                color: darkenHexColor(category.color, 25),
                                padding: '4px 10px'
                            }}>
                                {category.name}
                            </span>
                        );
                    }
                    return category ? category.name : '-';
                },
                style: { flex: '1 1 20%', display: 'flex', justifyContent: 'center' },
            },
            {
                header: 'Vencimento',
                renderCell: (revenue) => (
                    revenue.invoiceDueDate ? revenue.invoiceDueDate.split('-').reverse().join('/') : '-'
                ),
                style: { flex: '1 1 15%', display: 'flex', justifyContent: 'center' },
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
                        <span className={globalStyles.statusBadge} style={{
                            backgroundColor: `${baseColor}33`,
                            color: darkenHexColor(baseColor, 25),
                            padding: '4px 10px'
                        }}>
                            {statusMap[revenue.status] || '-'}
                        </span>
                    );
                },
                style: { flex: '1 1 15%', display: 'flex', justifyContent: 'center' },
            },
        )
    }

    columns.push(
        {
            header: 'Ações',
            renderCell: (revenue) => {
                let revenueActions = [
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
                    revenueActions.push({ icon: <HandCoins size={14}/>, label: 'Registrar recebimento', handler: () => handleOpenPaymentModal(revenue) })
                }

                if (!revenue.idInvoice && (revenue.status === 'paid' || revenue.status === 'partial')) {
                    revenueActions.push({ icon: <BanknoteXIcon size={14}/>, label: 'Gerenciar recebimentos', 
                        handler: () => onReversePayment(revenue)
                    })
                }
                return (
                    <ActionDropdown
                        actions={revenueActions}
                    />
                );
            },
            style: { flex: '1 1 15%', display: 'flex', justifyContent: 'center' },
        }
    )

    return (
        <FlexibleTable
            columns={columns}
            data={revenues}
            noDataMessage="Nenhuma receita cadastrada"
        />
    );
};

export default RevenueTable;