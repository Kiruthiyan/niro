import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeUp, fadeIn, transitionSmooth } from './utils/motion';
import WelcomeScreen from './components/WelcomeScreen';
import UnlockScreen from './components/UnlockScreen';
import MainContent from './components/MainContent';
import FinalSurprise from './components/FinalSurprise';
import NavigationBar from './components/NavigationBar';
import { useBrandMeta } from './utils/useBrandMeta';

function App() {
  useBrandMeta();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasOpenedGift, setHasOpenedGift] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  return (
    <motion.div
      className="app-container selection:bg-sky/40 selection:text-navy"
      {...fadeIn}
    >

      {!isUnlocked ? (
        <AnimatePresence mode="wait">
          <UnlockScreen key="unlock" onUnlock={() => setIsUnlocked(true)} />
        </AnimatePresence>
      ) : !hasOpenedGift ? (
        <AnimatePresence mode="wait">
          <WelcomeScreen key="welcome" onOpen={() => setHasOpenedGift(true)} />
        </AnimatePresence>
      ) : (
        <div className="w-full min-h-screen bg-app">
          <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />

          <main className="w-full relative z-10 pt-[4.75rem] md:pt-28 pb-28 md:pb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                {...fadeUp}
                transition={transitionSmooth}
              >
                {activeTab === 'surprise' ? (
                  <FinalSurprise
                    onBack={() => {
                      setHasOpenedGift(false);
                      setActiveTab('home');
                    }}
                  />
                ) : (
                  <MainContent activeSection={activeTab} />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      )}
    </motion.div>
  );
}

export default App;
