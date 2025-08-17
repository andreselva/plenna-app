import React from 'react';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import Skeleton from '../../Components/Skeleton/Skeleton';

export const ExpenseTableSkeleton = () => {
    const skeletonData = Array.from({ length: 8 }, (_, index) => ({ id: `skeleton-expense-${index}` }));

    const skeletonColumns = [
        {
            header: <Skeleton width="100px" height="20px" />,
            style: { flex: '1 1 25%', display: 'flex', justifyContent: 'center' },
            renderCell: () => <Skeleton width="80%" height="18px" />
        },
        {
            header: <Skeleton width="50px" height="20px" />,
            style: { flex: '1 1 5%', display: 'flex', justifyContent: 'center' },
            renderCell: () => <Skeleton width="90%" height="18px" />
        },
        {
            header: <Skeleton width="90px" height="20px" />,
            style: { flex: '1 1 10%', display: 'flex', justifyContent: 'center' },
            renderCell: () => <Skeleton width="80%" height="18px" />
        },
        {
            header: <Skeleton width="80px" height="20px" />,
            style: { flex: '1 1 15%', display: 'flex', justifyContent: 'center' },
            renderCell: () => <Skeleton width="100px" height="28px" borderRadius="14px" />
        },
        {
            header: <Skeleton width="110px" height="20px" />,
            style: { flex: '1 1 15%', display: 'flex', justifyContent: 'center' },
            renderCell: () => <Skeleton width="70%" height="18px" />
        },
        {
            header: <Skeleton width="60px" height="20px" />,
            style: { flex: '1 1 15%', display: 'flex', justifyContent: 'center' },
            renderCell: () => <Skeleton width="90px" height="28px" borderRadius="14px" />
        },
        {
            header: <Skeleton width="50px" height="20px" />,
            style: { flex: '1 1 10%', display: 'flex', justifyContent: 'center' },
            renderCell: () => <Skeleton variant="circle" width="32px" height="32px" />
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