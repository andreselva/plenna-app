import React from 'react';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import Skeleton from '../../Components/Skeleton/Skeleton';

const InvoiceTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 6 });

  return (
    <div className={globalStyles.flexibleTable}>
      <div className={globalStyles.tableBody}>
        {skeletonRows.map((_, index) => (
          <div key={index} className={globalStyles.tableRow}>
            
            <div style={{ flex: '1 1 20%', display: 'flex', justifyContent: 'center' }}><Skeleton width="80%" height="18px" /></div>
            <div style={{ flex: '1 1 15%', display: 'flex', justifyContent: 'center' }}><Skeleton width="90%" height="18px" /></div>
            <div style={{ flex: '1 1 15%', display: 'flex', justifyContent: 'center' }}><Skeleton width="90%" height="18px" /></div>
            <div style={{ flex: '1 1 10%', display: 'flex', justifyContent: 'center' }}><Skeleton width="70%" height="18px" /></div>
            <div style={{ flex: '1 1 10%', display: 'flex', justifyContent: 'center' }}><Skeleton width="70%" height="18px" /></div>
            
            <div style={{ flex: '1 1 15%', display: 'flex', justifyContent: 'center' }}>
                <Skeleton width="90px" height="28px" borderRadius="14px" />
            </div>

            <div style={{ flex: '1 1 15%', display: 'flex', justifyContent: 'center' }}>
              <Skeleton variant="circle" width="32px" height="32px" />
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceTableSkeleton;