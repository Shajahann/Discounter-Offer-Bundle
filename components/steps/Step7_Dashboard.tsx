
import React from 'react';
import type { Settings, TieredPricingOffer, MixMatchBundle, CartGoal, FreeGiftOffer, BogoOffer } from '../../types';
import { AppStatus } from '../../types';
import Card from '../ui/Card';
import { STEPS } from '../../constants';

interface Step7DashboardProps {
    settings: Settings;
    tieredOffers: TieredPricingOffer[];
    bundles: MixMatchBundle[];
    cartGoals: CartGoal[];
    freeGiftOffers: FreeGiftOffer[];
    bogoOffers: BogoOffer[];
}

const ActiveChip: React.FC<{ active: boolean }> = ({ active }) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${active ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100'}`}>
        {active ? 'ACTIVE' : 'INACTIVE'}
    </span>
);

const Step7Dashboard: React.FC<Step7DashboardProps> = ({ settings, tieredOffers, bundles, cartGoals, freeGiftOffers, bogoOffers }) => {
    const totalActiveOffers = [ ...tieredOffers, ...bundles, ...cartGoals, ...freeGiftOffers, ...bogoOffers].length;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{STEPS[6].title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{STEPS[6].description}</p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-primary/90 dark:bg-primary text-white">
                    <h3 className="font-semibold">App Status</h3>
                    <p className="text-3xl font-bold mt-2">{settings.appStatus}</p>
                </Card>
                <Card>
                    <h3 className="font-semibold text-gray-600 dark:text-gray-300">Total Active Offers</h3>
                    <p className="text-3xl font-bold mt-2">{totalActiveOffers}</p>
                </Card>
                 <Card>
                    <h3 className="font-semibold text-gray-600 dark:text-gray-300">Discount Behavior</h3>
                    <p className="text-lg mt-2">{settings.discountBehavior}</p>
                </Card>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Active Offers Overview</h2>
                <div className="space-y-6">
                    {tieredOffers.length > 0 && <Card title="Tiered Pricing Offers">
                        {tieredOffers.map(o => <div key={o.id} className="p-2 border-b dark:border-gray-700">Tiers: {o.tiers.length}, Targets: {o.targetingType}</div>)}
                    </Card>}
                    {bundles.length > 0 && <Card title="Mix & Match Bundles">
                        {bundles.map(b => <div key={b.id} className="p-2 border-b dark:border-gray-700">{b.name} - ${b.price}</div>)}
                    </Card>}
                     {cartGoals.length > 0 && <Card title="Cart Goals">
                        {cartGoals.map(g => <div key={g.id} className="p-2 border-b dark:border-gray-700">{g.type} at ${g.threshold}</div>)}
                    </Card>}
                     {freeGiftOffers.length > 0 && <Card title="Free Gift Offers">
                        {freeGiftOffers.map(o => <div key={o.id} className="p-2 border-b dark:border-gray-700">Trigger: {o.ruleType} at {o.threshold}</div>)}
                    </Card>}
                     {bogoOffers.length > 0 && <Card title="BOGO Offers">
                        {bogoOffers.map(o => <div key={o.id} className="p-2 border-b dark:border-gray-700">Buy from {o.buyTargetingType}, Get from {o.getTargetingType}</div>)}
                    </Card>}
                    {totalActiveOffers === 0 && (
                        <Card>
                            <p className="text-center text-gray-500">No active offers configured yet. Go back through the steps to create some!</p>
                        </Card>
                    )}
                </div>
            </div>

             <div className="mt-10 bg-green-50 dark:bg-green-900/50 border-l-4 border-green-500 p-4 rounded-md">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">
                            Your discount engine is configured and live!
                        </p>
                        <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                           <p>Please test each offer on your store's front-end to ensure they are working as expected.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step7Dashboard;
