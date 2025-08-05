import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'icons/*.png',
          'apple-touch-icon.png',
          'favicon.ico',
        ],
        manifest: {
          id: '/',
          name: 'Quiz de Djelfa',
          short_name: 'DjelfaQuiz',
          description: 'Un quiz interactif pour tester vos connaissances sur la région de Djelfa en Algérie.',
          theme_color: '#f1f5f9',
          background_color: '#f1f5f9',
          start_url: '/',
          display: 'standalone',
          display_override: ['standalone', 'window-controls-overlay'],
          orientation: 'portrait',
          iarc_rating_id: 'e10+', // exemple, à ajuster selon ton app
          prefer_related_applications: false,
          icons: [
            {
              src: '/icons/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/icons/icon-512x512-maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ],
          screenshots: [
            {
              src: '/screenshots/screenshot1.png',
              type: 'image/png',
              sizes: '540x720',
              label: 'Accueil du quiz'
            },
            {
              src: '/screenshots/screenshot2.png',
              type: 'image/png',
              sizes: '540x720',
              label: 'Question en cours'
            }
          ],
          launch_handler: {
            client_mode: 'focus-existing'
          },
          related_applications: [
            {
              platform: 'play',
              url: 'https://play.google.com/store/apps/details?id=com.djelfa.quiz',
              id: 'com.djelfa.quiz'
            }
          ]
        },
        workbox: {
          navigateFallback: 'offline.html',
        },
        devOptions: {
          enabled: true
        }
      })
    ]
  };
});
