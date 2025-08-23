import React from 'react';
import { Bar } from 'react-chartjs-2';
import './FaturaChart.css';

const FaturasChart = ({ data, options }) => {
    return (
        <div className="faturas-chart-container">
            <Bar 
                data={data} 
                options={options} 
            />
        </div>
    );
};

export default FaturasChart;