import React from 'react';
import { motion } from 'framer-motion';
import { Home, Camera, Gift } from 'lucide-react';
import AppLogo from './AppLogo';

const navItems = [
    { id: 'home', icon: Home, label: 'Memories' },
    { id: 'gallery', icon: Camera, label: 'Gallery' },
    { id: 'surprise', icon: Gift, label: 'Surprise' },
];

const NavigationBar = ({ activeTab, onTabChange }) => {
    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 md:hidden nav-blur border-b border-white/60">
                <div className="flex items-center justify-center py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
                    <AppLogo size="sm" showName />
                </div>
            </nav>

            <nav className="fixed top-0 left-0 right-0 z-50 hidden md:block nav-blur border-b border-white/60">
                <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                    <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
                        <AppLogo size="md" showName />
                    </motion.div>
                    <div className="flex gap-10">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                className={`text-sm font-semibold tracking-wide transition-all duration-300 relative px-2 py-1 ${
                                    activeTab === item.id ? 'text-primary' : 'text-muted hover:text-primary'
                                }`}
                            >
                                {item.label}
                                {activeTab === item.id && (
                                    <motion.div
                                        layoutId="nav-pill-desktop"
                                        className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gold rounded-full"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <nav className="fixed bottom-5 left-5 right-5 z-50 md:hidden nav-blur rounded-full shadow-soft-blue px-2 pb-[env(safe-area-inset-bottom)]">
                <div className="flex justify-around items-center h-16">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className="flex flex-col items-center justify-center relative flex-1 gap-1 py-2"
                        >
                            <motion.div
                                animate={{
                                    scale: activeTab === item.id ? 1.15 : 1,
                                    y: activeTab === item.id ? -2 : 0,
                                }}
                                className="relative z-10"
                            >
                                <item.icon
                                    size={22}
                                    strokeWidth={activeTab === item.id ? 2.5 : 2}
                                    className={activeTab === item.id ? 'text-primary' : 'text-navy/40'}
                                />
                            </motion.div>
                            <span
                                className={`text-[10px] font-semibold tracking-wide transition-colors ${
                                    activeTab === item.id ? 'text-primary' : 'text-navy/40'
                                }`}
                            >
                                {item.id === 'home' ? 'Story' : item.label}
                            </span>
                            {activeTab === item.id && (
                                <motion.div
                                    layoutId="active-nav-mobile"
                                    className="absolute inset-1 bg-sky/40 rounded-2xl -z-10 border border-white/80"
                                    initial={false}
                                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </nav>
        </>
    );
};

export default NavigationBar;
