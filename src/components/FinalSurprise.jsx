import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../data/content';
import { easeSmooth, springSoft, transitionSmooth } from '../utils/motion';
import { Sparkles, Gift, RefreshCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import FloatingDecor from './FloatingDecor';

const CONFETTI_COLORS = ['#6EA8FE', '#D9ECFF', '#EEF7FF', '#F6C85F', '#FFFFFF'];

const FinalSurprise = ({ onBack }) => {
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        if (!isRevealed) return;

        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: CONFETTI_COLORS,
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: CONFETTI_COLORS,
            });
        }, 250);

        return () => clearInterval(interval);
    }, [isRevealed]);

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {!isRevealed ? (
                    <motion.div
                        key="gift-box-final"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={transitionSmooth}
                        className="max-container flex flex-col items-center justify-center min-h-[70vh] py-20 px-6"
                    >
                        <motion.div
                            className="w-64 h-64 md:w-80 md:h-80 glass-card rounded-[2rem] shadow-soft-blue relative cursor-pointer group flex items-center justify-center"
                            whileHover={{ scale: 1.03, y: -4 }}
                            whileTap={{ scale: 0.97 }}
                            transition={springSoft}
                            onClick={() => setIsRevealed(true)}
                        >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-6 py-2.5 rounded-full shadow-soft-blue text-xs font-semibold tracking-wide text-primary border border-white">
                                One Final Surprise
                                <Sparkles size={12} className="inline ml-1 text-gold" />
                            </div>

                            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-10 md:w-14 bg-primary/10" />
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-10 md:h-14 bg-primary/10" />

                            <Gift
                                className="text-primary relative z-10 group-hover:scale-110 transition-transform w-16 h-16 md:w-24 md:h-24"
                                strokeWidth={1}
                            />
                        </motion.div>

                        <motion.p
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: easeSmooth }}
                            className="mt-12 text-muted font-medium tracking-wide text-sm text-center"
                        >
                            Tap to reveal the magic
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="final-reveal"
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={transitionSmooth}
                        className="bg-premium min-h-screen rounded-t-[2rem] md:rounded-t-[2.5rem] -mx-0 py-16 md:py-24 px-6 relative overflow-hidden"
                    >
                        <FloatingDecor variant="premium" />

                        <div className="max-container flex flex-col items-center gap-16 md:gap-24 relative z-10">
                            <div className="relative w-full max-w-4xl h-[380px] md:h-[560px] flex items-center justify-center">
                                {[...CONTENT.gallery].reverse().slice(0, 4).map((img, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0, rotate: 0 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            rotate: i % 2 === 0 ? (i + 1) * 5 : (i + 1) * -5,
                                            x: i * 18 - 27,
                                            y: i * 8 - 12,
                                        }}
                                        transition={{ delay: 0.4 + i * 0.15, ...springSoft }}
                                        className="absolute w-44 md:w-72 bg-white p-3 md:p-4 pb-10 md:pb-16 shadow-soft-blue border border-white/90 rounded-sm"
                                    >
                                        <img
                                            src={img.image}
                                            className="w-full aspect-square object-cover"
                                            alt="Memory"
                                        />
                                        <div className="h-1.5 md:h-2 w-1/2 bg-sky/40 rounded-full mx-auto mt-3" />
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.2, ...springSoft }}
                                    className="absolute z-50 w-20 h-20 md:w-32 md:h-32 bg-white rounded-full shadow-soft-blue flex items-center justify-center border-4 border-gold/30"
                                >
                                    <Heart className="text-primary fill-primary w-10 h-10 md:w-16 md:h-16 animate-glow" />
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1.5, ...transitionSmooth }}
                                className="glass-card p-10 md:p-16 max-w-3xl w-full text-center relative"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-gold to-sky rounded-t-[2rem]" />
                                <h2 className="section-title font-display text-navy mb-8 leading-tight">
                                    {CONTENT.final.title}
                                </h2>
                                <div className="space-y-5 text-left max-w-2xl mx-auto">
                                    {CONTENT.final.paragraphs.map((para, i) => (
                                        <motion.p
                                            key={i}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.6 + i * 0.12, duration: 0.6, ease: easeSmooth }}
                                            className={`text-body md:text-lg text-navy/85 leading-relaxed ${
                                                i === CONTENT.final.paragraphs.length - 1
                                                    ? 'font-display text-center pt-2 text-primary font-medium'
                                                    : ''
                                            }`}
                                        >
                                            {para}
                                        </motion.p>
                                    ))}
                                </div>
                                <div className="mt-10 flex items-center justify-center gap-3">
                                    <Sparkles className="text-gold w-5 h-5" />
                                    <span className="font-semibold tracking-wide text-xs md:text-sm text-primary">
                                        Friendship forever ❤️
                                    </span>
                                    <Sparkles className="text-gold w-5 h-5" />
                                </div>
                            </motion.div>

                            <button
                                onClick={onBack}
                                className="flex items-center gap-2 text-navy/60 hover:text-primary font-medium tracking-wide transition-all text-sm pb-8"
                            >
                                <RefreshCcw size={16} /> Replay Surprise
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FinalSurprise;
