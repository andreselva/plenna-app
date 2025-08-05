import { ActionDropdown } from '../../Components/ActionDropdown/ActionDropdown';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import { RevenueTableSkeleton } from '../../Pages/Revenues/RevenueTableSkeleton';
import globalStyles from '../../Styles/GlobalStyles.module.css';

const RevenueTable = ({ revenues = [], categories = [], onEdit, onDelete, loading, error }) => {
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

    // Definição das colunas para a tabela de receitas
    const columns = [
        {
            header: 'Descrição',
            accessor: 'name',
            style: { flex: '1 1 0%' },
        },
        {
            header: 'Valor',
            accessor: 'value',
            style: { flex: '1 1 0%' },
        },
        {
            header: 'Vencimento',
            style: { flex: '1 1 0%' },
            renderCell: (revenue) => revenue.invoiceDueDate.split('-').reverse().join('/'),
        },
        {
            header: 'Categoria',
            style: { flex: '1 1 0%' },
            renderCell: (revenue) => {
                const category = categories.find(cat => cat.id === revenue.idCategory) || {};
                return (
                    <span className={globalStyles.statusBadge} style={{
                        backgroundColor: category.color ? `${category.color}33` : 'rgba(0, 0, 0, 0.1)',
                    }}>
                        {category.name || 'N/A'}
                    </span>
                );
            },
        },
        {
            header: 'Ações',
            style: { flex: '1 1 120px' },
            renderCell: (revenue) => {
                 let revenueActions = [
                    {
                        label: 'Editar',
                        handler: () => onEdit(revenue)
                    },
                    {
                        label: 'Excluir',
                        handler: () => handleDelete(revenue)
                    }
                ];

                return (
                    <ActionDropdown
                        actions={revenueActions}
                    />
                );
            },
        },
    ];

    return (
        <FlexibleTable
            columns={columns}
            data={revenues}
            noDataMessage="Nenhuma receita cadastrada"
        />
    );
};

export default RevenueTable;