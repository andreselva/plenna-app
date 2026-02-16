import globalStyles from '../../Styles/GlobalStyles.module.css';

export const FlexibleTable = ({ columns, data, noDataMessage, onRowClick }) => {
    return (
        <div className={globalStyles.flexibleTable}>
            <div className={`${globalStyles.tableHeader} ${globalStyles.tableRow}`}>
                {columns.map((col, index) => (
                    <div key={index} style={col.style}>
                        {col.header}
                    </div>
                ))}
            </div>

            <div className={globalStyles.tableBody}>
                {data.length > 0 ? (
                    data.map((item) => (
                        <div
                            className={globalStyles.tableRow}
                            key={item.id}
                            onClick={onRowClick ? () => onRowClick(item) : undefined}
                            style={onRowClick ? { cursor: 'pointer' } : undefined}
                        >
                            {columns.map((col, index) => (
                                <div key={index} style={col.style} className={col.className}>
                                    {col.renderCell ? col.renderCell(item) : item[col.accessor]}
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className={globalStyles.tableRow}>
                        {noDataMessage || "Nenhum item encontrado"}
                    </div>
                )}
            </div>
        </div>
    );
};
