
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Step1Settings from './components/steps/Step1_Settings';
import Step2TieredPricing from './components/steps/Step2_TieredPricing';
import Step3MixMatchBundle from './components/steps/Step3_MixMatchBundle';
import Step4CartGoal from './components/steps/Step4_CartGoal';
import Step5FreeGift from './components/steps/Step5_FreeGift';
import Step6BOGO from './components/steps/Step6_BOGO';
import Step7Dashboard from './components/steps/Step7_Dashboard';
import { STEPS } from './constants';
import type { Settings, TieredPricingOffer, MixMatchBundle, CartGoal, FreeGiftOffer, BogoOffer } from './types';
import { AppStatus, DiscountBehavior } from './types';

const App: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<boolean[]>(Array(STEPS.length).fill(false));

    // Global state for all configurations
    const [settings, setSettings] = useState<Settings>({
        appStatus: AppStatus.Inactive,
        discountBehavior: DiscountBehavior.Best,
    });
    const [tieredOffers, setTieredOffers] = useState<TieredPricingOffer[]>([]);
    const [bundles, setBundles] = useState<MixMatchBundle[]>([]);
    const [cartGoals, setCartGoals] = useState<CartGoal[]>([]);
    const [freeGiftOffers, setFreeGiftOffers] = useState<FreeGiftOffer[]>([]);
    const [bogoOffers, setBogoOffers] = useState<BogoOffer[]>([]);

    const handleNext = () => {
        const newCompleted = [...completedSteps];
        newCompleted[currentStep] = true;
        setCompletedSteps(newCompleted);
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return <Step1Settings settings={settings} setSettings={setSettings} onNext={handleNext} />;
            case 1:
                return <Step2TieredPricing addOffer={offer => setTieredOffers(prev => [...prev, offer])} onNext={handleNext} />;
            case 2:
                return <Step3MixMatchBundle addBundle={bundle => setBundles(prev => [...prev, bundle])} onNext={handleNext} />;
            case 3:
                return <Step4CartGoal addGoal={goal => setCartGoals(prev => [...prev, goal])} onNext={handleNext} />;
            case 4:
                return <Step5FreeGift addOffer={offer => setFreeGiftOffers(prev => [...prev, offer])} onNext={handleNext} />;
            case 5:
                return <Step6BOGO addOffer={offer => setBogoOffers(prev => [...prev, offer])} onNext={handleNext} />;
            case 6:
                return <Step7Dashboard 
                    settings={settings}
                    tieredOffers={tieredOffers}
                    bundles={bundles}
                    cartGoals={cartGoals}
                    freeGiftOffers={freeGiftOffers}
                    bogoOffers={bogoOffers}
                />;
            default:
                return <div>Select a step</div>;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans">
            <Sidebar currentStep={currentStep} setCurrentStep={setCurrentStep} completedSteps={completedSteps} />
            <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
                {renderStepContent()}
            </main>
        </div>
    );
};

export default App;
