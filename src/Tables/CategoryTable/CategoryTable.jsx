import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import { ActionDropdown } from '../../Components/ActionDropdown/ActionDropdown';
import { CategoryTableSkeleton } from './CategoryTableSkeleton';

const CategoryTable = ({ categories, onEdit, onDelete, loading, error }) => {
    if (loading) {
        return <CategoryTableSkeleton />;
    }
    
    const handleDelete = DeleteConfirmation(onDelete, {
        confirmTitle: 'Deseja realmente excluir?',
        confirmText: 'A exclusão é definitiva!',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Manter',
    });

    const columns = [
        {
            header: 'Nome da Categoria',
            style: { flex: '0 0 10%'} ,
            renderCell: (category) => (
                <span className={globalStyles.statusBadge} style={{
                    backgroundColor: `${category.color}33`
                }}>
                    {category.name}
                </span>
            )
        },
        {
            header: 'Tipo',
            style: { flex: '0 0 0%'},
            renderCell: (category) => (
                <span className={globalStyles.statusBadge} style={{
                    backgroundColor: category.type.toUpperCase() === 'RECEITA' ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)"
                }}>
                    {category.type}
                </span>
            )
        },
        {
            header: 'Ações',
            style: { flex: '0 0 0%'},
            renderCell: (category) => {
                let categoryActions = [
                    {
                        label: 'Editar',
                        handler: () => onEdit(category)
                    },
                    {
                        label: 'Excluir',
                        handler: () => handleDelete(category.id)
                    }
                ];

                return (
                    <ActionDropdown
                        actions={categoryActions}
                    />
                )
            }
            
        }
    ];

    return (
        <FlexibleTable
            columns={columns}
            data={categories}
            noDataMessage="Nenhuma categoria cadastrada"
        />
    );
};

export default CategoryTable;