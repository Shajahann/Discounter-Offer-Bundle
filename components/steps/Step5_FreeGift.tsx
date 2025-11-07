
import React, { useState } from 'react';
import type { FreeGiftOffer } from '../../types';
import { FreeGiftRuleType } from '../../types';
import { MOCK_PRODUCTS, MOCK_COLLECTIONS, STEPS } from '../../constants';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import ToggleSwitch from '../ui/ToggleSwitch';

interface Step5FreeGiftProps {
    addOffer: (offer: FreeGiftOffer) => void;
    onNext: () => void;
}

const Step5FreeGift: React.FC<Step5FreeGiftProps> = ({ addOffer, onNext }) => {
    const [ruleType, setRuleType] = useState<FreeGiftRuleType>(FreeGiftRuleType.CartValue);
    const [threshold, setThreshold] = useState(75);
    const [targetCollectionId, setTargetCollectionId] = useState<string | undefined>(MOCK_COLLECTIONS[0]?.id);
    const [giftProductId, setGiftProductId] = useState<string>(MOCK_PRODUCTS[0]?.id);
    const [autoAddToCart, setAutoAddToCart] = useState(true);

    const handlePublish = () => {
        const newOffer: FreeGiftOffer = {
            id: `fg_${Date.now()}`,
            ruleType,
            threshold,
            targetCollectionId: ruleType === FreeGiftRuleType.ProductQuantity ? targetCollectionId : undefined,
            giftProductId,
            autoAddToCart,
        };
        addOffer(newOffer);
        console.log("Publishing free gift offer:", newOffer);
        onNext();
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{STEPS[4].title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{STEPS[4].description}</p>

            <div className="mt-8">
                <Card title="Create Free Gift Offer" description="Set up a rule to automatically add a free gift to the customer's cart.">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-md font-medium text-gray-900 dark:text-white">Qualification Rule</h3>
                            <fieldset className="mt-2">
                                <div className="flex gap-4">
                                    {Object.values(FreeGiftRuleType).map((type) => (
                                        <div key={type} className="flex items-center">
                                            <input
                                                id={type}
                                                name="rule-type"
                                                type="radio"
                                                checked={ruleType === type}
                                                onChange={() => setRuleType(type)}
                                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <label htmlFor={type} className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{type}</label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                        
                        {ruleType === FreeGiftRuleType.CartValue && (
                            <Input label="Minimum Cart Value" id="cart-value-threshold" type="number" value={threshold} onChange={e => setThreshold(parseFloat(e.target.value))} prefix="$" />
                        )}
                        
                        {ruleType === FreeGiftRuleType.ProductQuantity && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Minimum Quantity" id="qty-threshold" type="number" value={threshold} onChange={e => setThreshold(parseInt(e.target.value))} />
                                <Select id="target-collection" label="From Collection" value={targetCollectionId} onChange={e => setTargetCollectionId(e.target.value)}>
                                    {MOCK_COLLECTIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </Select>
                            </div>
                        )}
                        
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h3 className="text-md font-medium text-gray-900 dark:text-white">Gift Selection</h3>
                            <div className="mt-4 space-y-6">
                                <Select id="gift-product-select" label="Choose Gift Product" value={giftProductId} onChange={e => setGiftProductId(e.target.value)}>
                                    {MOCK_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </Select>
                                <ToggleSwitch label="Auto-Add to Cart" enabled={autoAddToCart} onChange={setAutoAddToCart} />
                            </div>
                        </div>
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

export default Step5FreeGift;
