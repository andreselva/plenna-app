import React from 'react';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import Skeleton from '../../Components/Skeleton/Skeleton';

export const RevenueTableSkeleton = () => {
    const skeletonData = Array.from({ length: 8 }, (_, index) => ({ id: `skeleton-revenue-${index}` }));

    const skeletonColumns = [
        {
            header: <Skeleton width="120px" height="20px" />,
            style: { flex: '1 1 35%', display: 'flex', justifyContent: 'center' },
            renderCell: () => <Skeleton width="80%" height="18px" />,
        },
        {
            header: <Skeleton width="80px" height="20px" />,
            style: { flex: '1 1 15%', display: 'flex', justifyContent: 'center' },
            renderCell: () => <Skeleton width="70%" height="18px" />,
        },
        {
            header: <Skeleton width="90px" height="20px" />,
            style: { flex: '1 1 15%', display: 'flex', justifyContent: 'center' },
            renderCell: () => <Skeleton width="80%" height="18px" />,
        },
        {
            header: <Skeleton width="100px" height="20px" />,
            style: { flex: '1 1 20%', display: 'flex', justifyContent: 'center' },
            renderCell: () => <Skeleton width="120px" height="28px" borderRadius="14px" />,
        },
        {
            header: <Skeleton width="60px" height="20px" />,
            style: { flex: '1 1 15%', display: 'flex', justifyContent: 'center' },
            renderCell: () => <Skeleton variant="circle" width="32px" height="32px" />,
        },
    ];

    return (
        <FlexibleTable
            columns={skeletonColumns}
            data={skeletonData}
            noDataMessage=""
        />
    );
};