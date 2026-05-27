/** Shared smooth motion presets for Framer Motion */
export const easeSmooth = [0.22, 1, 0.36, 1];

export const transitionSmooth = {
    duration: 0.65,
    ease: easeSmooth,
};

export const transitionFast = {
    duration: 0.45,
    ease: easeSmooth,
};

export const springSoft = {
    type: 'spring',
    stiffness: 100,
    damping: 22,
    mass: 0.85,
};

export const springSnappy = {
    type: 'spring',
    stiffness: 140,
    damping: 24,
    mass: 0.8,
};

export const fadeUp = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: transitionSmooth,
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: transitionFast,
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: springSoft,
};

export const imageCrossfade = {
    initial: { opacity: 0, scale: 1.02 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: 0.5, ease: easeSmooth },
};

/** Pure opacity blend — no slide, no scale pop */
export const easeBlend = [0.4, 0, 0.2, 1];

export const photoBlend = {
    transition: { duration: 1.15, ease: easeBlend },
};
