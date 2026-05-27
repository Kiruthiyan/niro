import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, Gift } from 'lucide-react';

const lightItems = [
    { Icon: Sparkles, top: '12%', left: '8%', size: 18, delay: 0 },
    { Icon: Heart, top: '18%', right: '10%', size: 16, delay: 0.5 },
    { Icon: Star, top: '70%', left: '6%', size: 14, delay: 1 },
    { Icon: Gift, top: '75%', right: '8%', size: 16, delay: 1.5 },
    { Icon: Sparkles, top: '45%', right: '5%', size: 14, delay: 0.8 },
    { Icon: Star, top: '55%', left: '12%', size: 12, delay: 1.2 },
];

const premiumItems = [
    { Icon: Sparkles, top: '10%', left: '10%', size: 18, delay: 0 },
    { Icon: Star, top: '20%', right: '12%', size: 16, delay: 0.4 },
    { Icon: Heart, top: '80%', left: '8%', size: 14, delay: 0.8 },
    { Icon: Sparkles, top: '85%', right: '10%', size: 16, delay: 1.2 },
];

const FloatingDecor = ({ variant = 'light' }) => {
    const items = variant === 'premium' ? premiumItems : lightItems;
    const iconClass = variant === 'premium'
        ? 'text-gold/40'
        : 'text-primary/25';

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
            {items.map(({ Icon, top, left, right, size, delay }, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${iconClass}`}
                    style={{ top, left, right }}
                    animate={{
                        y: [0, -12, 0],
                        x: [0, i % 2 === 0 ? 6 : -6, 0],
                        opacity: variant === 'premium' ? [0.3, 0.55, 0.3] : [0.15, 0.3, 0.15],
                    }}
                    transition={{
                        duration: 6 + i,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay,
                    }}
                >
                    <Icon size={size} strokeWidth={1.5} />
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingDecor;
