import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import { ActionDropdown } from '../../Components/ActionDropdown/ActionDropdown';
import { CategoryTableSkeleton } from './CategoryTableSkeleton';
import { darkenHexColor } from '../../Utils/DarkenColor';
import { Pencil, Trash2 } from 'lucide-react';
import { useBreakpoints } from '../../Hooks/useMediaQuery/useBreakpoints';

const CategoryTable = ({ categories, onEdit, onDelete, loading, error }) => {
    const { isMobile } = useBreakpoints();
    if (loading) {
        return <CategoryTableSkeleton />;
    }
    
    const handleDelete = DeleteConfirmation(onDelete, {
        confirmTitle: 'Deseja realmente excluir?',
        confirmText: 'A exclusão é definitiva!',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Manter',
    });

    const RECEITA_COLOR = '#28a745';
    const DESPESA_COLOR = '#dc3545';

    const columns = [
        {
            header: 'Nome da Categoria',
            style: { flex: '0 0 50%', display: 'flex', justifyContent: 'center'} ,
            renderCell: (category) => {
                if (isMobile) {
                    return (
                        <span className={globalStyles.statusBadge} 
                            style={{
                                color: darkenHexColor(category.color, 30),
                            }}>
                            {category.name}
                        </span>
                    )
                }

                return (
                    <span className={globalStyles.statusBadge} style={{
                        backgroundColor: `${category.color}33`,
                        color: darkenHexColor(category.color, 30),
                    }}>
                        {category.name}
                    </span>
                )
            }
        },
        {
            header: 'Tipo',
            style: { flex: '0 0 20%', display: 'flex', justifyContent:'center'},
            renderCell: (category) => {
                const isReceita = category.type.toUpperCase() === 'RECEITA';
                const baseColor = isReceita ? RECEITA_COLOR : DESPESA_COLOR;
                if (isMobile) {
                    return (
                        <span
                            style={{
                                color: darkenHexColor(baseColor, 25)
                            }}
                        >
                            {category.type}
                        </span>
                    )
                } 

                return (
                    <span className={globalStyles.statusBadge} 
                        style={{
                            backgroundColor: `${baseColor}33`,
                            color: darkenHexColor(baseColor, 25),
                            width: '35%'
                        }}
                    >
                        {category.type}
                    </span>
                );
            }
        },
        {
            header: 'Ações',
            style: { flex: '0 0 30%', display:'flex', justifyContent: 'center'},
            renderCell: (category) => {
                let categoryActions = [
                    {
                        icon: <Pencil size={14} />,
                        text: 'Editar',
                        handler: () => onEdit(category)
                    },
                    {
                        icon: <Trash2 size={14} />,
                        text: 'Excluir',
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