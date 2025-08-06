export async function envoyerReponse(reponse: any) {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    const registration = await navigator.serviceWorker.ready;
    let reponses = (await localforage.getItem('reponses_en_attente')) || [];
    reponses.push(reponse);
    await localforage.setItem('reponses_en_attente', reponses);
    await registration.sync.register('sync-reponses');
  } else {
    await fetch('/api/repondre', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reponse)
    });
  }
}
