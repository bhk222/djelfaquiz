import React from '// Enregistrement du Service Workeimport React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { registerPush } from './lib/pushManager';
import { registerSync } from './lib/syncManager';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("L'élément racine est introuvable.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service Worker désactivé pour éviter les problèmes de cache
if ('serviceWorker' in navigator && false) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('[SW] Enregistré avec succès', registration);

      // 🔔 Enregistrement des notifications push
      await registerPush(registration);

      // 🔁 Enregistrement du background sync
      await registerSync();

    } catch (err) {
      console.error('[SW] Échec d'enregistrement', err);
    }
  });
}('serviceWorker' in navigator && false) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('[SW] Enregistré avec succès', registration);

      // 🔔 Enregistrement des notifications push
      await registerPush(registration);

      // 🔁 Enregistrement du background sync
      await registerSync();

    } catch (err) {
      console.error('[SW] Échec d'enregistrement', err);
    }
  });
}

// Désinstaller tous les service workers existants
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('[SW] Désinstallé:', registration.scope);
      }
      console.log('[SW] Tous les service workers ont été désinstallés');
      // Recharger la page après désinstallation
      window.location.reload();
    } catch (err) {
      console.error('[SW] Erreur lors de la désinstallation', err);
    }
  });
}ctDOM from 'react-dom/client';
import App from './App';

import { registerPush } from './lib/pushManager';
import { registerSync } from './lib/syncManager';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("L'élément racine est introuvable.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Enregistrement du Service Worker + Push + Sync
if ('serviceWorker' in navigator && false) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('[SW] Enregistré avec succès', registration);

      // 🔔 Enregistrement des notifications push
      await registerPush(registration);

      // 🔁 Enregistrement du background sync
      await registerSync();

    } catch (err) {
      console.error('[SW] Échec d’enregistrement', err);
    }
  });
}
