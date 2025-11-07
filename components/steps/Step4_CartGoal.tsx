
import React, { useState } from 'react';
import type { CartGoal } from '../../types';
import { CartGoalType } from '../../types';
import { MOCK_PRODUCTS, STEPS } from '../../constants';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface Step4CartGoalProps {
    addGoal: (goal: CartGoal) => void;
    onNext: () => void;
}

const Step4CartGoal: React.FC<Step4CartGoalProps> = ({ addGoal, onNext }) => {
    const [type, setType] = useState<CartGoalType>(CartGoalType.FreeShipping);
    const [threshold, setThreshold] = useState(100);
    const [giftProductId, setGiftProductId] = useState<string | undefined>(MOCK_PRODUCTS[0]?.id);
    const [headline, setHeadline] = useState("You're almost there!");
    const [message, setMessage] = useState("You're $__ away from free shipping!");
    const [color, setColor] = useState("#4f46e5");

    const handleSave = () => {
        const newGoal: CartGoal = {
            id: `goal_${Date.now()}`,
            type,
            threshold,
            giftProductId: type === CartGoalType.FreeGift ? giftProductId : undefined,
            headline,
            message,
            color,
        };
        addGoal(newGoal);
        console.log("Saving cart goal:", newGoal);
        onNext();
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{STEPS[3].title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{STEPS[3].description}</p>

            <div className="mt-8">
                <Card title="Add New Goal" description="Configure a visual incentive that appears in the cart to encourage larger orders.">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-md font-medium text-gray-900 dark:text-white">Goal Type</h3>
                            <fieldset className="mt-2">
                                <div className="flex gap-4">
                                    {Object.values(CartGoalType).map((goalType) => (
                                        <div key={goalType} className="flex items-center">
                                            <input
                                                id={goalType}
                                                name="goal-type"
                                                type="radio"
                                                checked={type === goalType}
                                                onChange={() => setType(goalType)}
                                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <label htmlFor={goalType} className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {goalType}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                        
                        <Input label={`Goal Threshold (${type})`} id="goal-threshold" type="number" value={threshold} onChange={e => setThreshold(parseFloat(e.target.value))} prefix="$" />

                        {type === CartGoalType.FreeGift && (
                             <Select id="gift-product" label="Select Gift Product" value={giftProductId} onChange={e => setGiftProductId(e.target.value)}>
                                {MOCK_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </Select>
                        )}

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                             <h3 className="text-md font-medium text-gray-900 dark:text-white">Messaging & Styling</h3>
                             <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Use `__` as a placeholder for the remaining amount.</p>
                             <div className="space-y-4">
                                <Input label="Headline" id="headline" value={headline} onChange={e => setHeadline(e.target.value)} />
                                <Input label="Message" id="message" value={message} onChange={e => setMessage(e.target.value)} />
                                <Input label="Progress Bar Color" id="color" type="color" value={color} onChange={e => setColor(e.target.value)} className="w-24 p-1 h-10"/>
                             </div>
                        </div>

                    </div>
                </Card>
            </div>

            <div className="mt-8 flex justify-end">
                <Button onClick={handleSave}>
                    Save Goal & Continue
                </Button>
            </div>
        </div>
    );
};

export default Step4CartGoal;
