import React from 'react';
import { AnimatePresence } from 'framer-motion';
import GallerySection from './GallerySection';
import StorySection from './StorySection';

const MainContent = ({ activeSection }) => {
    return (
        <div className="max-container">
            <AnimatePresence mode="wait">
                {activeSection === 'home' && <StorySection key="story" />}
                {activeSection === 'gallery' && <GallerySection key="gallery" />}
            </AnimatePresence>
        </div>
    );
};

export default MainContent;
