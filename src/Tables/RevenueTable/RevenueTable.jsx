import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import globalStyles from '../../Styles/GlobalStyles.module.css';

const RevenueTable = ({ revenues = [], categories = [], onEdit, onDelete }) => {
    const handleDelete = DeleteConfirmation(onDelete, {
        confirmTitle: 'Deseja realmente excluir?',
        confirmText: 'A exclusão é definitiva!',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Manter',
        successMessage: 'Receita excluída!',
        errorMessage: 'Erro ao excluir receita!'
    });

    return (
        <div className={globalStyles.flexibleTable}>
            {/* Cabeçalho da Tabela */}
            <div className={`${globalStyles.tableHeader} ${globalStyles.tableRow}`}>
                <div style={{ flex: '1 1 0%' }}>Descrição</div>
                <div style={{ flex: '1 1 0%' }}>Valor</div>
                <div style={{ flex: '1 1 0%' }}>Vencimento</div>
                <div style={{ flex: '1 1 0%' }}>Categoria</div>
                <div style={{ flex: '1 1 120px', textAlign: 'center' }}>Ações</div>
            </div>

            {/* Corpo da Tabela */}
            <div className={globalStyles.tableBody}>
                {revenues.length > 0 ? (
                    revenues.map((revenue) => {
                        const category = categories.find(cat => cat.id === revenue.idCategory) || {};
                        return (
                            <div key={revenue.id} className={globalStyles.tableRow}>
                                <div style={{ flex: '1 1 0%' }}>{revenue.name}</div>
                                <div style={{ flex: '1 1 0%' }}>{revenue.value}</div>
                                <div style={{ flex: '1 1 0%' }}>{revenue.invoiceDueDate.split('-').reverse().join('/')}</div>
                                <div style={{ flex: '1 1 0%' }}>
                                    <span className={globalStyles.statusBadge} style={{
                                        backgroundColor: category.color ? `${category.color}33` : 'rgba(0, 0, 0, 0.1)',
                                    }}>
                                        {category.name || 'N/A'}
                                    </span>
                                </div>
                                <div className={globalStyles.actions} style={{ flex: '1 1 120px', justifyContent: 'center' }}>
                                    <button
                                        className={globalStyles['action-button']}
                                        onClick={() => onEdit(revenue)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className={globalStyles['action-button']}
                                        onClick={() => handleDelete(revenue)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className={globalStyles.tableRow} style={{ justifyContent: 'center', padding: '20px' }}>
                        Nenhuma receita cadastrada
                    </div>
                )}
            </div>
        </div>
    );
};

export default RevenueTable;