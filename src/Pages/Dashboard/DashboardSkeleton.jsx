import React from 'react';
import Skeleton from '../../Components/Skeleton/Skeleton';
import "./Dashboard.css";

export const DashboardSkeleton = () => {
    return (
        <div className="Dashboard">
            <div className="Dashboard-content">
                <div style={{ alignSelf: 'flex-start', marginBottom: '20px' }}>
                    <Skeleton width="280px" height="40px" />
                </div>

                <div className="row">
                    <div className="card chart row-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
                        <Skeleton width="250px" height="24px" />
                        <Skeleton variant="circle" width="250px" height="250px" className="skeleton-center" />
                    </div>

                    <div className="card chart row-1" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '20px' }} >
                        <Skeleton width="200px" height="24px" />
                        <Skeleton variant="rect" height="250px" />
                    </div>

                    <div className="card chart row-1" style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                        <Skeleton width="120px" height="24px" />
                        <Skeleton variant="rect" height="250px" />
                    </div>
                </div>

                <div className="card table" style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                    <Skeleton width="180px" height="24px" />
                    <div className="table-wrapper" style={{ marginTop: '1rem' }}>
                        <Skeleton variant="rect" height="40px" />
                        <Skeleton variant="rect" height="40px" />
                        <Skeleton variant="rect" height="40px" />
                    </div>
                </div>

                <div className="row">
                    <div className="card full-width" style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                        <Skeleton width="220px" height="24px" />
                        <Skeleton variant="rect" height="250px" />
                    </div>
                </div>
            </div>
        </div>
    );
};
