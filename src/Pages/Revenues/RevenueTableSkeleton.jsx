import React from 'react';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import Skeleton from '../../Components/Skeleton/Skeleton';

export const RevenueTableSkeleton = () => {
    const skeletonData = Array.from({ length: 5 }, (_, index) => ({ id: `skeleton-revenue-${index}` }));

    const skeletonColumns = [
        {
            header: <Skeleton width="70px" height="20px" />,
            style: { flex: '1 1 0%' },
            renderCell: () => <Skeleton width="90%" />,
        },
        {
            header: <Skeleton width="50px" height="20px" />,
            style: { flex: '1 1 0%' },
            renderCell: () => <Skeleton width="60%" />,
        },
        {
            header: <Skeleton width="80px" height="20px" />,
            style: { flex: '1 1 0%' },
            renderCell: () => <Skeleton width="70%" />,
        },
        {
            header: <Skeleton width="70px" height="20px" />,
            style: { flex: '1 1 0%' },
            renderCell: () => <Skeleton width="100px" height="24px" />,
        },
        {
            header: <Skeleton width="60px" height="20px" />,
            style: { flex: '1 1 120px' },
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