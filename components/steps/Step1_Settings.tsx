
import React from 'react';
import type { Settings } from '../../types';
import { AppStatus, DiscountBehavior } from '../../types';
import Card from '../ui/Card';
import ToggleSwitch from '../ui/ToggleSwitch';
import Button from '../ui/Button';
import { STEPS } from '../../constants';

interface Step1SettingsProps {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
    onNext: () => void;
}

const Step1Settings: React.FC<Step1SettingsProps> = ({ settings, setSettings, onNext }) => {
    const handleSave = () => {
        // Here you would typically make an API call to save settings
        console.log("Saving settings:", settings);
        onNext();
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{STEPS[0].title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{STEPS[0].description}</p>
            
            <div className="mt-8 space-y-6">
                <Card title="Global App Settings" description="Control the overall status and behavior of the app.">
                    <div className="space-y-6">
                        <ToggleSwitch
                            label="App Status"
                            enabled={settings.appStatus === AppStatus.Active}
                            onChange={(enabled) =>
                                setSettings({ ...settings, appStatus: enabled ? AppStatus.Active : AppStatus.Inactive })
                            }
                        />
                         <div>
                            <h3 className="text-md font-medium text-gray-900 dark:text-white">Cart Discount Behavior</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Choose how multiple discounts should interact.</p>
                            <fieldset className="mt-4">
                                <div className="space-y-4">
                                    {Object.values(DiscountBehavior).map((behavior) => (
                                        <div key={behavior} className="flex items-center">
                                            <input
                                                id={behavior}
                                                name="discount-behavior"
                                                type="radio"
                                                checked={settings.discountBehavior === behavior}
                                                onChange={() => setSettings({ ...settings, discountBehavior: behavior })}
                                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <label htmlFor={behavior} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {behavior}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mt-8 flex justify-end">
                <Button onClick={handleSave}>
                    Save & Continue
                </Button>
            </div>
        </div>
    );
};

export default Step1Settings;
