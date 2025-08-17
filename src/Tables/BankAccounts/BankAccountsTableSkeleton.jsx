import React from 'react';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import Skeleton from '../../Components/Skeleton/Skeleton';

export const BankAccountsTableSkeleton = () => {
    const skeletonData = Array.from({ length: 8 }, (_, index) => ({ id: `skeleton-${index}` }));

    const skeletonColumns = [
        {
            header: <Skeleton width="120px" height="20px" />,
            style: { flex: '1 1 40%', display: 'flex', justifyContent: 'center' },
            renderCell: () => <Skeleton width="70%" height="18px" />
        },
        {
            header: <Skeleton width="100px" height="20px" />,
            style: { flex: '1 1 30%', display: 'flex', justifyContent: 'center' },
            renderCell: () => (
                <Skeleton width="80px" height="24px" borderRadius="12px" />
            )
        },
        {
            header: <Skeleton width="80px" height="20px" />,
            style: { flex: '1 1 30%', display: 'flex', justifyContent: 'center' },
            renderCell: () => (
                <Skeleton variant="circle" width="32px" height="32px" />
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