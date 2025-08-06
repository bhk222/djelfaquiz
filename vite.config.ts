import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['algeria-flag-icon.png', 'icons/*.png'],
      manifest: {
        name: 'Quiz de Djelfa',
        short_name: 'DjelfaQuiz',
        description: 'Un quiz interactif pour tester vos connaissances sur la région de Djelfa en Algérie.',
        start_url: '/',
        display: 'fullscreen',
        background_color: '#ffffff',
        theme_color: '#4285F4',
        lang: 'ar',
        scope: '/',
        id: '/',
        display_override: ['fullscreen', 'standalone', 'minimal-ui'],
        orientation: 'portrait',
        dir: 'rtl',
        categories: ['education', 'games'],
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/icon-512x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,json}'],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          }
        ],
        skipWaiting: true,
        clientsClaim: true
      }
    })
  ],
  server: {
    port: 5000
  }
})
