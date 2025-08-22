import React from 'react';
import { Tag } from 'lucide-react';
import './TopCategoryCard.css'; 

const TopCategoryCard = ({ categoryData }) => {
    const { name = 'N/D', value = 0, percentage = 0 } = categoryData || {};

    const formatCurrency = (val) => {
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="card top-category-card">
            <div className="top-category-header">
                <Tag className="top-category-icon" size={20} />
                <span className="top-category-title">Principal Categoria</span>
            </div>
            <div className="top-category-body">
                <span className="top-category-name">{name}</span>
                <span className="top-category-value">{formatCurrency(value)}</span>
                <span className="top-category-percentage">
                    {percentage}% do total de despesas
                </span>
            </div>
        </div>
    );
};

export default TopCategoryCard;