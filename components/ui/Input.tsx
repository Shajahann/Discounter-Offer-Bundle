
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    type?: string;
    className?: string;
    prefix?: string;
    suffix?: string;
}

const Input: React.FC<InputProps> = ({ label, id, type = 'text', className, prefix, suffix, ...props }) => {
    const hasAddon = prefix || suffix;
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {label}
            </label>
            <div className={`relative rounded-md shadow-sm ${className}`}>
                {prefix && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><span className="text-gray-500 sm:text-sm">{prefix}</span></div>}
                <input
                    type={type}
                    id={id}
                    className={`block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-primary focus:ring-primary sm:text-sm
                    ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-7' : ''}`}
                    {...props}
                />
                {suffix && <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"><span className="text-gray-500 sm:text-sm">{suffix}</span></div>}
            </div>
        </div>
    );
};

export default Input;
