import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../data/content';
import { easeSmooth, springSoft, transitionSmooth } from '../utils/motion';
import { Sparkles, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import FloatingDecor from './FloatingDecor';
import AppLogo from './AppLogo';

const CONFETTI_COLORS = ['#6EA8FE', '#D9ECFF', '#EEF7FF', '#F6C85F', '#FFFFFF'];

const UnlockScreen = ({ onUnlock }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code === CONTENT.birthYear.toString()) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: CONFETTI_COLORS,
            });
            onUnlock();
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="min-h-[100dvh] w-full flex items-center justify-center p-6 relative overflow-hidden bg-app">
            <FloatingDecor variant="light" />

            <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={transitionSmooth}
                className="glass-light p-10 md:p-14 w-full max-w-xl text-center relative z-10"
            >
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: easeSmooth }}
                    className="mb-6 flex flex-col items-center gap-3"
                >
                    <AppLogo size="xl" />
                    <span className="font-display font-bold text-2xl text-navy">{CONTENT.appName}</span>
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-navy tracking-tight">
                    {CONTENT.unlock.title}
                </h2>

                <p className="text-muted mb-10 font-medium text-body leading-relaxed px-4">
                    {CONTENT.unlock.subtitle}
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="relative max-w-xs mx-auto">
                        <input
                            type="tel"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder={CONTENT.unlock.placeholder}
                            className="w-full p-6 rounded-[1.75rem] border-2 border-sky focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-center text-4xl font-bold tracking-[0.35em] bg-white/80 backdrop-blur-md transition-all text-navy placeholder:text-sky"
                            autoFocus
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="text-primary font-semibold text-sm bg-sky/40 py-2 px-5 rounded-full inline-block"
                            >
                                {CONTENT.unlock.error}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <button type="submit" className="btn-pill w-full max-w-xs mx-auto">
                        <span className="flex-1 text-center font-semibold tracking-wide text-[15px]">
                            {CONTENT.unlock.button}
                        </span>
                        <ChevronRight size={20} />
                    </button>
                </form>

                <div className="mt-10 flex justify-center gap-3 opacity-40">
                    <Sparkles size={18} className="text-primary" />
                    <Sparkles size={18} className="text-gold" />
                    <Sparkles size={18} className="text-primary" />
                </div>
            </motion.div>
        </div>
    );
};

export default UnlockScreen;
