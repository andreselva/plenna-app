import React from 'react';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import Skeleton from '../../Components/Skeleton/Skeleton';

export const CategoryTableSkeleton = () => {
    const skeletonData = Array.from({ length: 8 }, (_, index) => ({ id: `skeleton-category-${index}` }));

    const skeletonColumns = [
        {
            header: <Skeleton width="150px" height="20px" />,
            style: { flex: '0 0 50%', display: 'flex', justifyContent: 'center' },
            renderCell: () => <Skeleton width="180px" height="28px" borderRadius="14px" />,
        },
        {
            header: <Skeleton width="80px" height="20px" />,
            style: { flex: '0 0 20%', display: 'flex', justifyContent: 'center' },
            renderCell: () => <Skeleton width="100px" height="28px" borderRadius="14px" />,
        },
        {
            header: <Skeleton width="80px" height="20px" />,
            style: { flex: '0 0 30%', display: 'flex', justifyContent: 'center' },
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