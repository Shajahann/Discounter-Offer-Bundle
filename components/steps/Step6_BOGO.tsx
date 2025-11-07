
import React, { useState } from 'react';
import type { BogoOffer, BogoTier } from '../../types';
import { TargetingType } from '../../types';
import { MOCK_PRODUCTS, MOCK_COLLECTIONS, STEPS } from '../../constants';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface Step6BOGOProps {
    addOffer: (offer: BogoOffer) => void;
    onNext: () => void;
}

const Step6BOGO: React.FC<Step6BOGOProps> = ({ addOffer, onNext }) => {
    const [buyTargetingType, setBuyTargetingType] = useState<TargetingType>(TargetingType.Collections);
    const [buyTargets, setBuyTargets] = useState<string[]>([MOCK_COLLECTIONS[0]?.id]);
    const [getTargetingType, setGetTargetingType] = useState<TargetingType>(TargetingType.Collections);
    const [getTargets, setGetTargets] = useState<string[]>([MOCK_COLLECTIONS[0]?.id]);
    const [tiers, setTiers] = useState<BogoTier[]>([{ buyQuantity: 1, getQuantity: 1, getDiscount: 100 }]);

    const addTier = () => {
        const lastTier = tiers[tiers.length - 1] || { buyQuantity: 0, getQuantity: 0, getDiscount: 100 };
        setTiers([...tiers, { buyQuantity: lastTier.buyQuantity + 1, getQuantity: lastTier.getQuantity, getDiscount: 100 }]);
    };
    
    const updateTier = (index: number, field: keyof BogoTier, value: number) => {
        const newTiers = [...tiers];
        newTiers[index] = { ...newTiers[index], [field]: value };
        setTiers(newTiers);
    };
    
    const removeTier = (index: number) => {
        setTiers(tiers.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        const newOffer: BogoOffer = {
            id: `bogo_${Date.now()}`,
            buyTargetingType,
            buyTargets,
            getTargetingType,
            getTargets,
            tiers,
        };
        addOffer(newOffer);
        console.log("Saving BOGO offer:", newOffer);
        onNext();
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{STEPS[5].title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{STEPS[5].description}</p>

            <div className="mt-8">
                <Card title="Create 'Buy X Get Y' Offer" description="Define the conditions for a BOGO-style promotion.">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Buys</h3>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Select id="buy-targeting" label="Targeting" value={buyTargetingType} onChange={e => setBuyTargetingType(e.target.value as TargetingType)}>
                                    {Object.values(TargetingType).map(type => <option key={type} value={type}>{type}</option>)}
                                </Select>
                                {buyTargetingType === TargetingType.Products ? (
                                    // Fix: Cast e.target to HTMLSelectElement to access selectedOptions.
                                    <Select id="buy-product" label="Select Products" multiple value={buyTargets} onChange={e => setBuyTargets(Array.from((e.target as HTMLSelectElement).selectedOptions, option => option.value))}>
                                        {MOCK_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </Select>
                                ) : (
                                    // Fix: Cast e.target to HTMLSelectElement to access selectedOptions.
                                    <Select id="buy-collection" label="Select Collections" multiple value={buyTargets} onChange={e => setBuyTargets(Array.from((e.target as HTMLSelectElement).selectedOptions, option => option.value))}>
                                        {MOCK_COLLECTIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </Select>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Gets</h3>
                             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Select id="get-targeting" label="Targeting" value={getTargetingType} onChange={e => setGetTargetingType(e.target.value as TargetingType)}>
                                    {Object.values(TargetingType).map(type => <option key={type} value={type}>{type}</option>)}
                                </Select>
                                {getTargetingType === TargetingType.Products ? (
                                    // Fix: Cast e.target to HTMLSelectElement to access selectedOptions.
                                    <Select id="get-product" label="Select Products" multiple value={getTargets} onChange={e => setGetTargets(Array.from((e.target as HTMLSelectElement).selectedOptions, option => option.value))}>
                                        {MOCK_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </Select>
                                ) : (
                                    // Fix: Cast e.target to HTMLSelectElement to access selectedOptions.
                                    <Select id="get-collection" label="Select Collections" multiple value={getTargets} onChange={e => setGetTargets(Array.from((e.target as HTMLSelectElement).selectedOptions, option => option.value))}>
                                        {MOCK_COLLECTIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </Select>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tiers</h3>
                            <div className="space-y-4">
                                {tiers.map((tier, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 items-end gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                                        <Input label={`Buy Quantity`} id={`tier-buy-qty-${index}`} type="number" value={tier.buyQuantity} onChange={e => updateTier(index, 'buyQuantity', parseInt(e.target.value))} />
                                        <Input label="Get Quantity" id={`tier-get-qty-${index}`} type="number" value={tier.getQuantity} onChange={e => updateTier(index, 'getQuantity', parseInt(e.target.value))} />
                                        <Input label="Get Discount" id={`tier-get-disc-${index}`} type="number" value={tier.getDiscount} onChange={e => updateTier(index, 'getDiscount', parseInt(e.target.value))} suffix="%" />
                                        <Button variant="danger" onClick={() => removeTier(index)} className="self-end !px-2 !py-2 mb-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                             <Button variant="ghost" onClick={addTier} className="mt-4">+ Add Tier</Button>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mt-8 flex justify-end">
                <Button onClick={handleSave}>
                    Save Offer & Continue
                </Button>
            </div>
        </div>
    );
};

export default Step6BOGO;