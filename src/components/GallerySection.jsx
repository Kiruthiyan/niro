import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../data/content';
import { easeBlend, easeSmooth, photoBlend, springSoft, transitionSmooth } from '../utils/motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const FILTERS = ['All', 'Memories', 'Special', 'Friends', 'FIT'];

const stagger = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: 0.06 },
    },
};

const tileVariant = {
    hidden: { opacity: 0, y: 14, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.55, ease: easeBlend },
    },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.35, ease: easeBlend } },
};

const GalleryImage = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <motion.img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            initial={false}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={photoBlend.transition}
            className="gallery-photo-img"
            loading="lazy"
            decoding="async"
            draggable={false}
        />
    );
};

const LightboxPhotos = ({ items, index }) => {
    const visible = [-1, 0, 1].map((offset) => {
        const i = (index + offset + items.length) % items.length;
        return { ...items[i], slot: offset };
    });

    return (
        <div className="gallery-lightbox-viewport relative w-full min-h-[50vh] flex items-center justify-center">
            {visible.map((item) => (
                <motion.img
                    key={`${item.id}-${item.slot}`}
                    src={item.image}
                    alt={item.caption || 'Memory'}
                    initial={false}
                    animate={{ opacity: item.slot === 0 ? 1 : 0 }}
                    transition={photoBlend.transition}
                    style={{ zIndex: item.slot === 0 ? 2 : 1 }}
                    className="absolute max-h-[75vh] max-w-full w-auto h-auto object-contain px-2 pointer-events-none select-none"
                    draggable={false}
                />
            ))}
        </div>
    );
};

const GallerySection = () => {
    const [galleryFilter, setGalleryFilter] = useState('All');
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const filteredGallery = CONTENT.gallery.filter((item) => {
        if (galleryFilter === 'All') return true;
        return item.category === galleryFilter;
    });

    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const goNext = useCallback(() => {
        setLightboxIndex((i) => (i === null ? null : (i + 1) % filteredGallery.length));
    }, [filteredGallery.length]);

    const goPrev = useCallback(() => {
        setLightboxIndex((i) =>
            i === null ? null : (i - 1 + filteredGallery.length) % filteredGallery.length
        );
    }, [filteredGallery.length]);

    useEffect(() => {
        if (lightboxIndex === null) return;

        const onKey = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [lightboxIndex, goNext, goPrev]);

    useEffect(() => {
        if (lightboxIndex !== null && lightboxIndex >= filteredGallery.length) {
            setLightboxIndex(filteredGallery.length ? filteredGallery.length - 1 : null);
        }
    }, [filteredGallery.length, lightboxIndex]);

    const activeItem = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitionSmooth}
            className="space-y-10 md:space-y-14 py-8 md:py-12"
        >
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.65, ease: easeSmooth }}
                className="text-center px-4"
            >
                <h2 className="section-title font-display text-navy mb-3">Memory Album</h2>
                <p className="text-body text-muted max-w-xl mx-auto">
                    Moments captured in friendship — tap any photo to relive it.
                </p>
            </motion.div>

            <div className="flex justify-center flex-wrap gap-2.5 md:gap-3 px-4">
                {FILTERS.map((filter) => (
                    <motion.button
                        key={filter}
                        type="button"
                        layout
                        onClick={() => {
                            setGalleryFilter(filter);
                            setLightboxIndex(null);
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={springSoft}
                        className={
                            galleryFilter === filter
                                ? 'btn-pill-filter-active'
                                : 'btn-pill-filter'
                        }
                    >
                        {filter}
                    </motion.button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {filteredGallery.length === 0 ? (
                    <motion.p
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={transitionSmooth}
                        className="text-center text-muted py-16"
                    >
                        No photos in this album yet.
                    </motion.p>
                ) : (
                    <motion.div
                        key={galleryFilter}
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="gallery-masonry px-2 md:px-0"
                    >
                        {filteredGallery.map((item, idx) => (
                            <motion.button
                                key={`${galleryFilter}-${item.id}`}
                                type="button"
                                variants={tileVariant}
                                layout
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                transition={springSoft}
                                className="gallery-masonry-item group w-full text-left"
                                onClick={() => openLightbox(idx)}
                            >
                                <div className="gallery-photo-frame">
                                    <GalleryImage
                                        src={item.image}
                                        alt={item.caption || 'Memory'}
                                    />
                                </div>
                                {item.caption && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.15 + Math.min(idx * 0.02, 0.2) }}
                                        className="mt-2 px-1 text-[13px] md:text-sm text-muted font-display italic leading-snug line-clamp-2"
                                    >
                                        {item.caption}
                                    </motion.p>
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {activeItem && lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: easeBlend }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                        onClick={closeLightbox}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: easeBlend }}
                            className="absolute inset-0 bg-sky/30 backdrop-blur-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-white/75"
                        />

                        <motion.button
                            type="button"
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={transitionSmooth}
                            className="absolute top-5 right-5 md:top-8 md:right-8 z-20 w-11 h-11 rounded-full bg-white/90 border border-sky/40 shadow-soft-blue flex items-center justify-center text-navy hover:bg-sky/30 transition-colors duration-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeLightbox();
                            }}
                            aria-label="Close"
                        >
                            <X size={22} strokeWidth={1.5} />
                        </motion.button>

                        {filteredGallery.length > 1 && (
                            <>
                                <motion.button
                                    type="button"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={transitionSmooth}
                                    className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 border border-sky/40 shadow-soft-blue flex items-center justify-center text-navy hover:bg-sky/40 transition-colors duration-300"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goPrev();
                                    }}
                                    aria-label="Previous"
                                >
                                    <ChevronLeft size={24} />
                                </motion.button>
                                <motion.button
                                    type="button"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={transitionSmooth}
                                    className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 border border-sky/40 shadow-soft-blue flex items-center justify-center text-navy hover:bg-sky/40 transition-colors duration-300"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goNext();
                                    }}
                                    aria-label="Next"
                                >
                                    <ChevronRight size={24} />
                                </motion.button>
                            </>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            transition={transitionSmooth}
                            className="relative z-10 flex flex-col items-center max-w-5xl w-full max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-full rounded-2xl overflow-hidden bg-white/60 border border-white shadow-soft-blue">
                                <LightboxPhotos items={filteredGallery} index={lightboxIndex} />
                            </div>
                            <motion.p
                                key={activeItem.caption}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={photoBlend.transition}
                                className="mt-5 px-6 py-3 text-center text-base md:text-lg font-display italic text-navy max-w-2xl"
                            >
                                &ldquo;{activeItem.caption || 'A beautiful memory'}&rdquo;
                            </motion.p>
                            {filteredGallery.length > 1 && (
                                <p className="mt-2 text-xs text-muted tracking-wide">
                                    {lightboxIndex + 1} / {filteredGallery.length}
                                </p>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default GallerySection;
