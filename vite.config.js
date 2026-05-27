import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit: 0,
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      filename: 'niroja-sw.js',
      includeAssets: ['logo.png'],
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      manifest: {
        id: '/niroja-birthday-app',
        name: 'Niroja',
        short_name: 'Niroja',
        description: 'A special birthday gift for Niroja — memories, friendship, and love.',
        theme_color: '#EEF7FF',
        background_color: '#EEF7FF',
        display: 'standalone',
        icons: [
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    })
  ],
})

