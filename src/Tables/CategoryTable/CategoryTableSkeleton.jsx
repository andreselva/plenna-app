import React from 'react';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import Skeleton from '../../Components/Skeleton/Skeleton';

export const CategoryTableSkeleton = () => {
    const skeletonData = Array.from({ length: 7 }, (_, index) => ({ id: `skeleton-category-${index}` }));

    const skeletonColumns = [
        {
            header: <Skeleton width="120px" height="20px" />,
            style: { flex: '2 1 0%' },
            renderCell: () => <Skeleton width="150px" height="24px" />,
        },
        {
            header: <Skeleton width="40px" height="20px" />,
            style: { flex: '1 1 0%' },
            renderCell: () => <Skeleton width="80px" height="24px" />,
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