import React from 'react';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import Skeleton from '../../Components/Skeleton/Skeleton';

export const BankAccountsTableSkeleton = () => {
    const skeletonData = Array.from({ length: 5 }, (_, index) => ({ id: `skeleton-${index}` }));

    const skeletonColumns = [
        {
            header: <Skeleton width="200px" height="20px" />,
            style: { flex: '2 1 0%' },
            renderCell: () => <Skeleton width="80%" />
        },
        {
            header: <Skeleton width="200px" height="20px" />,
            style: { flex: '2 1 0%' },
            renderCell: () => <Skeleton width="300px" />
        },
        {
            header: <Skeleton width="150px" height="20px" />,
            style: { flex: '1 1 250px', display: 'flex', justifyContent: 'center' },
            renderCell: () => (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Skeleton variant="circle" width="32px" height="32px" />
                </div>
            )
        }
    ];

    return (
        <FlexibleTable
            columns={skeletonColumns}
            data={skeletonData}
            noDataMessage=""
        />
    );
};