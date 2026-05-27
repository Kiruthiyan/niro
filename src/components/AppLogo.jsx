import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../data/content';
import { springSoft } from '../utils/motion';

const sizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-28 h-28',
};

const AppLogo = ({ size = 'md', showName = false, className = '' }) => {
    return (
        <motion.div
            className={`flex items-center gap-3 ${className}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springSoft}
        >
            <motion.div
                className={`app-logo-mark ${sizes[size]} shrink-0`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                transition={springSoft}
            >
                <img
                    src={CONTENT.logo}
                    alt={CONTENT.appName}
                    className="w-full h-full rounded-[0.85rem] object-contain bg-white"
                    draggable={false}
                />
            </motion.div>
            {showName && (
                <span className="font-display font-bold text-navy text-xl md:text-2xl tracking-tight">
                    {CONTENT.appName}
                </span>
            )}
        </motion.div>
    );
};

export default AppLogo;
