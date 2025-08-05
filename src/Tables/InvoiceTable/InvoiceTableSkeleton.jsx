import React from 'react';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import Skeleton from '../../Components/Skeleton/Skeleton';

const InvoiceTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className={globalStyles.flexibleTable}>
      <div className={globalStyles.tableBody}>
        {skeletonRows.map((_, index) => (
          <div key={index} style={{ padding: '25px 0 25px 0' }} className={globalStyles.tableRow}>
            
            <div style={{ flex: '1 1 0%' }}><Skeleton width="90%" /></div>
            <div style={{ flex: '2 1 0%' }}><Skeleton width="70%" /></div>
            <div style={{ flex: '2 1 0%' }}><Skeleton width="70%" /></div>
            <div style={{ flex: '1 1 0%' }}><Skeleton width="50%" /></div>
            <div style={{ flex: '1 1 0%' }}><Skeleton width="50%" /></div>
            <div style={{ flex: '2 1 0%' }}><Skeleton width="100px" height="24px" /></div>
            <div style={{ flex: '1 0 0%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Skeleton variant="circle" width="30px" height="30px" />
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceTableSkeleton;