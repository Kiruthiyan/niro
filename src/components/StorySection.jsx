import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../data/content';
import { photoBlend, springSoft, transitionSmooth, easeSmooth } from '../utils/motion';
import {
    MapPin,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Heart,
    Camera,
    Mountain,
    BookOpen,
    ShoppingBag,
    UtensilsCrossed,
    Pizza,
    Trees,
    Sparkles,
    BookMarked,
    GraduationCap,
} from 'lucide-react';

const ICONS = {
    'galle-face': Camera,
    dinner: UtensilsCrossed,
    'hanthana-hiking': Mountain,
    'juice-bar': Sparkles,
    library: BookOpen,
    'mall-visiting': ShoppingBag,
    'book-fair': BookMarked,
    fit: GraduationCap,
    selfie: Heart,
    bingchung: Pizza,
    boatyard: Trees,
    pizza: Pizza,
};

const MemoryPhotos = ({ images, title }) => {
    const [index, setIndex] = useState(0);
    const hasMany = images.length > 1;

    const goTo = (nextIndex) => {
        setIndex((nextIndex + images.length) % images.length);
    };

    const next = (e) => {
        e?.stopPropagation?.();
        goTo(index + 1);
    };

    const prev = (e) => {
        e?.stopPropagation?.();
        goTo(index - 1);
    };

    useEffect(() => {
        if (!hasMany) return;
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [hasMany, images.length]);

    if (!images.length) return null;

    return (
        <div className="relative w-full">
            {hasMany && (
                <>
                    {images.slice(0, 3).map((img, i) => (
                        <div
                            key={img.id}
                            className="absolute inset-0 rounded-2xl bg-white border border-sky/30 shadow-[0_4px_16px_rgba(110,168,254,0.08)] pointer-events-none"
                            style={{
                                transform: `rotate(${(i - 1) * 3}deg) translate(${i * 4}px, ${i * 3}px)`,
                                zIndex: i,
                                opacity: 0.3 + i * 0.06,
                            }}
                            aria-hidden
                        />
                    ))}
                </>
            )}

            <motion.div
                className="story-photo-stage relative z-10 rounded-2xl overflow-hidden bg-white border border-sky/40 shadow-[0_8px_28px_rgba(110,168,254,0.12)]"
                whileHover={{ scale: 1.01, y: -2 }}
                transition={springSoft}
            >
                <div className="story-photo-viewport relative w-full min-h-[220px] md:min-h-[300px] flex items-center justify-center bg-white">
                    {images.map((img, i) => (
                        <motion.img
                            key={img.id}
                            src={img.image}
                            alt={`${title} ${i + 1}`}
                            initial={false}
                            animate={{ opacity: i === index ? 1 : 0 }}
                            transition={photoBlend.transition}
                            style={{ zIndex: i === index ? 2 : 1 }}
                            className="absolute inset-0 w-full h-full object-contain p-1 pointer-events-none select-none"
                            draggable={false}
                            loading={i <= 1 ? 'eager' : 'lazy'}
                            decoding="async"
                        />
                    ))}
                </div>

                {hasMany && (
                    <>
                        <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-white/95 text-[11px] font-semibold text-primary border border-sky/40 shadow-sm">
                            {index + 1} / {images.length}
                        </div>
                        <button
                            type="button"
                            onClick={prev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 border border-sky/40 flex items-center justify-center text-navy hover:bg-sky/40 transition-colors duration-300 shadow-sm"
                            aria-label="Previous photo"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            type="button"
                            onClick={next}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 border border-sky/40 flex items-center justify-center text-navy hover:bg-sky/40 transition-colors duration-300 shadow-sm"
                            aria-label="Next photo"
                        >
                            <ChevronRight size={18} />
                        </button>
                        <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
                            {images.map((img, i) => (
                                <button
                                    key={img.id}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIndex(i);
                                    }}
                                    className={`h-1.5 rounded-full transition-all duration-700 ease-out ${
                                        i === index ? 'w-5 bg-primary' : 'w-1.5 bg-sky'
                                    }`}
                                    aria-label={`Photo ${i + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

const StorySection = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitionSmooth}
            className="py-8 md:py-12"
        >
            <div className="max-container">
                <div className="lg:grid lg:grid-cols-[minmax(260px,340px)_1fr] lg:gap-16 lg:items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={transitionSmooth}
                        className="text-center lg:text-left mb-12 lg:mb-0 lg:sticky lg:top-28"
                    >
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
                            Our Story
                        </p>
                        <h2 className="section-title font-display text-navy mb-4">
                            {CONTENT.story.title}
                        </h2>
                        <p className="text-body text-muted leading-relaxed mb-6">
                            {CONTENT.story.subtitle}
                        </p>
                        <div className="glass-light px-5 py-4 rounded-2xl text-left hidden lg:block">
                            <p className="text-sm text-muted leading-relaxed">{CONTENT.story.intro}</p>
                        </div>
                        <div className="gold-divider mt-6 hidden lg:block" />
                    </motion.div>

                    <div className="relative">
                        <div
                            className="absolute left-4 md:left-5 top-0 bottom-0 w-px bg-sky/60 hidden sm:block"
                            aria-hidden
                        />

                        <ul className="space-y-8 md:space-y-10">
                            {CONTENT.storyMemories.map((memory, idx) => {
                                const Icon = ICONS[memory.id] || Heart;
                                return (
                                    <motion.li
                                        key={memory.id}
                                        initial={{ opacity: 0, y: 32 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{
                                            delay: Math.min(idx * 0.07, 0.45),
                                            duration: 0.65,
                                            ease: easeSmooth,
                                        }}
                                        className="relative pl-0 sm:pl-12"
                                    >
                                        <div
                                            className="absolute left-2.5 md:left-3.5 top-8 w-3 h-3 rounded-full bg-primary border-2 border-white shadow-[0_0_0_4px_rgba(110,168,254,0.2)] hidden sm:block"
                                            aria-hidden
                                        />

                                        <motion.article
                                            whileHover={{ y: -5 }}
                                            transition={springSoft}
                                            className="bg-white/90 backdrop-blur-sm rounded-[1.75rem] border border-white p-5 md:p-7 shadow-[0_12px_40px_rgba(110,168,254,0.1)]"
                                        >
                                            <div className="flex items-start gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-sky/50 flex items-center justify-center shrink-0 border border-sky/30">
                                                    <Icon size={20} className="text-primary" strokeWidth={1.5} />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="text-xl md:text-2xl font-display text-navy leading-tight">
                                                        {memory.title}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted">
                                                        <span className="inline-flex items-center gap-1">
                                                            <Calendar size={14} className="text-primary" />
                                                            {memory.date}
                                                        </span>
                                                        <span className="inline-flex items-center gap-1">
                                                            <MapPin size={14} className="text-primary" />
                                                            {memory.place}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-body text-navy/80 leading-relaxed mb-5">
                                                {memory.story}
                                            </p>

                                            <MemoryPhotos images={memory.images} title={memory.title} />
                                        </motion.article>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-sm text-muted mt-12 lg:hidden px-4"
                >
                    {CONTENT.story.intro}
                </motion.p>
            </div>
        </motion.section>
    );
};

export default StorySection;
