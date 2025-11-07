
import React, { useState } from 'react';
import type { MixMatchBundle } from '../../types';
import { MOCK_PRODUCTS, STEPS } from '../../constants';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface Step3MixMatchBundleProps {
    addBundle: (bundle: MixMatchBundle) => void;
    onNext: () => void;
}

const Step3MixMatchBundle: React.FC<Step3MixMatchBundleProps> = ({ addBundle, onNext }) => {
    const [name, setName] = useState('Summer Essentials Kit');
    const [price, setPrice] = useState(50);
    const [products, setProducts] = useState<string[]>([]);
    const [minProducts, setMinProducts] = useState(3);
    const [maxProducts, setMaxProducts] = useState(5);

    const handleSave = () => {
        const newBundle: MixMatchBundle = {
            id: `bndl_${Date.now()}`,
            name,
            price,
            products,
            minProducts,
            maxProducts,
        };
        addBundle(newBundle);
        console.log("Saving bundle:", newBundle);
        onNext();
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{STEPS[2].title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{STEPS[2].description}</p>

            <div className="mt-8">
                <Card title="Create Mix & Match Bundle" description="Create a fixed-price bundle where customers choose from a selection of products.">
                    <div className="space-y-6">
                        <Input label="Bundle Name" id="bundle-name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Summer Essentials Kit" />
                        <Input label="Bundle Price" id="bundle-price" type="number" value={price} onChange={e => setPrice(parseFloat(e.target.value))} prefix="$" />
                        
                        <div>
                            {/* Fix: Cast e.target to HTMLSelectElement to access selectedOptions. */}
                            <Select id="bundle-products" label="Eligible Products" multiple value={products} onChange={e => setProducts(Array.from((e.target as HTMLSelectElement).selectedOptions, option => option.value))} className="h-40">
                                {MOCK_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </Select>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Select the products customers can choose from for this bundle.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Minimum Products Required" id="min-products" type="number" value={minProducts} onChange={e => setMinProducts(parseInt(e.target.value))} />
                            <Input label="Maximum Products Allowed" id="max-products" type="number" value={maxProducts} onChange={e => setMaxProducts(parseInt(e.target.value))} />
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mt-8 flex justify-end">
                <Button onClick={handleSave}>
                    Save Bundle & Continue
                </Button>
            </div>
        </div>
    );
};

export default Step3MixMatchBundle;