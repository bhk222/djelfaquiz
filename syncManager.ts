export async function envoyerReponse(data: any) {
  if (navigator.onLine) {
    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      return await res.json();
    } catch (err) {
      console.error('[syncManager] En ligne mais erreur :', err);
    }
  } else if ('serviceWorker' in navigator && 'SyncManager' in window) {
    const sw = await navigator.serviceWorker.ready;
    const cache = await caches.open('quiz-sync-queue');
    const id = Date.now();
    const request = new Request(`/sync-queue/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    await cache.put(request, new Response(JSON.stringify(data)));
    await sw.sync.register('sync-quiz');
    console.log('[syncManager] Requête mise en file pour sync');
  } else {
    alert("Impossible d'enregistrer votre réponse hors ligne.");
  }
}
