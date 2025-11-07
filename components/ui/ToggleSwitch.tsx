
import React from 'react';

interface ToggleSwitchProps {
    label: string;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, enabled, onChange }) => {
    return (
        <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
            <button
                type="button"
                className={`${
                    enabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus`}
                onClick={() => onChange(!enabled)}
            >
                <span
                    className={`${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
            </button>
        </div>
    );
};

export default ToggleSwitch;
