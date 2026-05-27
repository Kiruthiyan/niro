import { useEffect } from 'react';
import { CONTENT } from '../data/content';

const BRAND = {
    title: 'Niroja',
    description: 'Niroja — a special birthday gift filled with memories and friendship.',
};

function setMeta(attr, key, value) {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', value);
}

/** Keeps tab title, PWA name, and icons on Niroja (overrides stale host / SW cache). */
export function useBrandMeta() {
    useEffect(() => {
        document.title = BRAND.title;

        setMeta('name', 'application-name', CONTENT.appName);
        setMeta('name', 'apple-mobile-web-app-title', CONTENT.appName);
        setMeta('name', 'description', BRAND.description);

        const iconHref = '/logo.png?v=niroja-1';
        const ensureLink = (rel) => {
            let link = document.querySelector(`link[rel="${rel}"]`);
            if (!link) {
                link = document.createElement('link');
                link.rel = rel;
                document.head.appendChild(link);
            }
            link.href = iconHref;
            link.type = 'image/png';
        };

        ensureLink('icon');
        ensureLink('apple-touch-icon');
    }, []);
}
