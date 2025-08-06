export async function registerSync() {
  const registration = await navigator.serviceWorker.ready;

  if ('sync' in registration) {
    try {
      // Enregistrer plusieurs types de sync
      await (registration as any).sync.register('sync-quiz-progress');
      await (registration as any).sync.register('sync-user-stats');
      await (registration as any).sync.register('sync-offline-actions');
      console.log('Background sync registered successfully');
    } catch (err) {
      console.error('Background sync failed', err);
    }
  }

  // Fallback avec periodic background sync si supporté
  if ('serviceWorker' in navigator && 'periodicSync' in registration) {
    try {
      await (registration as any).periodicSync.register('periodic-quiz-update', {
        minInterval: 24 * 60 * 60 * 1000, // 24 heures
      });
      console.log('Periodic sync registered');
    } catch (err) {
      console.log('Periodic sync not supported:', err);
    }
  }
}
