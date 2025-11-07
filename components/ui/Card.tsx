
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
}

const Card: React.FC<CardProps> = ({ children, className, title, description }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 ${className}`}>
            {title && <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{title}</h2>}
            {description && <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{description}</p>}
            {children}
        </div>
    );
};

export default Card;
