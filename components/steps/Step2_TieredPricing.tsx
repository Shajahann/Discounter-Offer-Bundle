
import React, { useState } from 'react';
import type { TieredPricingOffer, Tier } from '../../types';
import { TargetingType } from '../../types';
import { MOCK_PRODUCTS, MOCK_COLLECTIONS, STEPS } from '../../constants';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import ToggleSwitch from '../ui/ToggleSwitch';
import Select from '../ui/Select';

interface Step2TieredPricingProps {
    addOffer: (offer: TieredPricingOffer) => void;
    onNext: () => void;
}

const Step2TieredPricing: React.FC<Step2TieredPricingProps> = ({ addOffer, onNext }) => {
    const [targetingType, setTargetingType] = useState<TargetingType>(TargetingType.All);
    const [targets, setTargets] = useState<string[]>([]);
    const [tiers, setTiers] = useState<Tier[]>([{ quantity: 2, discount: 10 }]);
    const [showSelector, setShowSelector] = useState(true);

    const addTier = () => {
        const lastTier = tiers[tiers.length - 1] || { quantity: 0, discount: 0 };
        setTiers([...tiers, { quantity: lastTier.quantity + 2, discount: lastTier.discount + 5 }]);
    };

    const updateTier = (index: number, field: keyof Tier, value: number) => {
        const newTiers = [...tiers];
        newTiers[index] = { ...newTiers[index], [field]: value };
        setTiers(newTiers);
    };

    const removeTier = (index: number) => {
        setTiers(tiers.filter((_, i) => i !== index));
    };

    const handlePublish = () => {
        const newOffer: TieredPricingOffer = {
            id: `tp_${Date.now()}`,
            targetingType,
            targets,
            tiers,
            showSelector,
        };
        addOffer(newOffer);
        console.log("Publishing tiered pricing offer:", newOffer);
        onNext();
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{STEPS[1].title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{STEPS[1].description}</p>
            
            <div className="mt-8 space-y-6">
                <Card title="Create New Offer" description="Set up volume discounts that appear on product pages.">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-md font-medium text-gray-900 dark:text-white">Targeting</h3>
                             <Select id="targetingType" label="Apply this discount to" value={targetingType} onChange={e => setTargetingType(e.target.value as TargetingType)}>
                                {Object.values(TargetingType).map(type => <option key={type} value={type}>{type}</option>)}
                            </Select>
                        </div>

                        {targetingType === TargetingType.Products && (
                            // Fix: Cast e.target to HTMLSelectElement to access selectedOptions.
                            <Select id="product-targets" label="Select Products" multiple value={targets} onChange={e => setTargets(Array.from((e.target as HTMLSelectElement).selectedOptions, option => option.value))}>
                                {MOCK_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </Select>
                        )}
                        {targetingType === TargetingType.Collections && (
                            // Fix: Cast e.target to HTMLSelectElement to access selectedOptions.
                             <Select id="collection-targets" label="Select Collections" multiple value={targets} onChange={e => setTargets(Array.from((e.target as HTMLSelectElement).selectedOptions, option => option.value))}>
                                {MOCK_COLLECTIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </Select>
                        )}

                        <div>
                            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Tier Setup</h3>
                            <div className="space-y-4">
                                {tiers.map((tier, index) => (
                                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                                        <Input label={`Tier ${index + 1} Quantity`} id={`tier-qty-${index}`} type="number" value={tier.quantity} onChange={e => updateTier(index, 'quantity', parseInt(e.target.value))} />
                                        <Input label="Discount" id={`tier-disc-${index}`} type="number" value={tier.discount} onChange={e => updateTier(index, 'discount', parseInt(e.target.value))} suffix="%" />
                                        <Button variant="danger" onClick={() => removeTier(index)} className="mt-6 self-start !px-2 !py-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" onClick={addTier} className="mt-4">+ Add Tier</Button>
                        </div>
                        
                        <ToggleSwitch label="Show Quantity Selector on Product Page" enabled={showSelector} onChange={setShowSelector} />
                    </div>
                </Card>
            </div>

            <div className="mt-8 flex justify-end">
                <Button onClick={handlePublish}>
                    Publish Offer & Continue
                </Button>
            </div>
        </div>
    );
};

export default Step2TieredPricing;