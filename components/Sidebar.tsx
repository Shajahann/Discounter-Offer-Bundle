
import React from 'react';
import { STEPS } from '../constants';

interface SidebarProps {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    completedSteps: boolean[];
}

const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
    </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ currentStep, setCurrentStep, completedSteps }) => {
    return (
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex-shrink-0">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-primary dark:text-indigo-400">Discount Engine</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Setup Guide</p>
            </div>
            <nav className="mt-4">
                <ul>
                    {STEPS.map((step, index) => {
                        const isCurrent = currentStep === index;
                        const isCompleted = completedSteps[index];
                        return (
                            <li key={index} className="px-3">
                                <button
                                    onClick={() => setCurrentStep(index)}
                                    className={`w-full text-left flex items-center p-3 my-1 rounded-lg transition-colors duration-200 
                                    ${isCurrent 
                                        ? 'bg-primary/10 text-primary dark:bg-indigo-500/20 dark:text-indigo-300 font-semibold' 
                                        : 'hover:bg-gray-200/50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center justify-center w-6 h-6 mr-3 rounded-full border-2 border-primary dark:border-indigo-400">
                                        {isCompleted ? <CheckIcon className="w-4 h-4 text-primary dark:text-indigo-400" /> : <span className="text-xs font-bold text-primary dark:text-indigo-400">{index + 1}</span>}
                                    </div>
                                    <span className="flex-1">{step.title}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
