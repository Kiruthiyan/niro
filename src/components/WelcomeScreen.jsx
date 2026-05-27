import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../data/content';
import { easeSmooth, springSoft, transitionSmooth } from '../utils/motion';
import { Gift, Sparkles, Star } from 'lucide-react';
import FloatingDecor from './FloatingDecor';

const WelcomeScreen = ({ onOpen }) => {
    return (
        <div className="min-h-[100dvh] w-full flex items-center justify-center p-6 relative bg-app overflow-hidden">
            <FloatingDecor variant="light" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: easeSmooth }}
                className="max-container flex flex-col lg:flex-row lg:items-center justify-center gap-12 lg:gap-20 relative z-10"
            >
                <div className="text-center lg:text-left flex-1 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h1 className="main-title font-display mb-6 text-navy leading-tight">
                            Happy Birthday, <br className="hidden lg:block" />
                            <span className="text-primary">{CONTENT.name}</span>
                        </h1>
                        <p className="text-body text-muted font-light mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            {CONTENT.welcome.subtitle}
                        </p>

                        <motion.button
                            onClick={onOpen}
                            className="btn-pill mx-auto lg:mx-0 w-full md:w-auto px-14 py-5"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {CONTENT.welcome.buttonText}
                            <motion.div
                                animate={{ rotate: [0, 15, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <Gift size={22} />
                            </motion.div>
                        </motion.button>
                    </motion.div>
                </div>

                <div className="flex-1 w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, ...springSoft }}
                        className="relative"
                    >
                        <motion.div
                            className="glass-light p-4 md:p-5 shadow-soft-blue relative"
                            whileHover={{ y: -4 }}
                            transition={springSoft}
                        >
                            <div className="rounded-[1.5rem] overflow-hidden bg-white border border-sky/40 min-h-[280px] md:min-h-[340px] flex items-center justify-center">
                                <motion.img
                                    src={CONTENT.welcome.heroImage}
                                    alt="Niroja"
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.55, duration: 0.85, ease: easeSmooth }}
                                    className="w-full h-auto max-h-[380px] object-contain"
                                    draggable={false}
                                />
                            </div>
                            <div className="mt-6 flex justify-between items-center px-1">
                                <div className="flex gap-1.5">
                                    <Star size={14} className="text-gold fill-gold" />
                                    <Star size={14} className="text-gold fill-gold" />
                                </div>
                                <span className="text-ui text-muted italic font-display">For you, Niroja</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="absolute -top-6 -right-4 text-primary/30"
                            animate={{ rotate: [0, 10, 0], scale: [1, 1.08, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Sparkles size={48} />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default WelcomeScreen;
