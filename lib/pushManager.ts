const VAPID_PUBLIC_KEY = "BHDMDbReXycnfSAfoU2RJ_jkl00LFDG1st-DaPwg0cqymnsw7yWL7CNEK1iLeorXRgjrpuQpXLnuJFOPBuSpJTE";

export async function registerPush(registration: ServiceWorkerRegistration) {
  if ('pushManager' in registration) {
    try {
      // Vérifier si déjà inscrit
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log('Push subscription already exists');
        return existingSubscription;
      }

      // Demander permission pour les notifications
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.log('Permission de notification refusée');
        throw new Error('Notification permission denied');
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
      
      // Envoyer la subscription au serveur avec retry
      await sendSubscriptionToServer(subscription);
      
      // Test de notification locale de bienvenue
      if ('showNotification' in registration) {
        await registration.showNotification('🎉 مرحباً بك في اختبار الجلفة!', {
          body: 'تم تفعيل الإشعارات بنجاح. ستتلقى تحديثات حول أسئلة جديدة!',
          icon: '/icons/icon-192.png',
          badge: '/icons/icon-192.png',
          tag: 'welcome-notification',
          actions: [
            {
              action: 'start-quiz',
              title: 'ابدأ الاختبار الآن'
            },
            {
              action: 'dismiss',
              title: 'حسناً'
            }
          ],
          data: {
            url: '/',
            timestamp: Date.now()
          }
        } as any);
      }

      return subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      throw error;
    }
  }
}

async function sendSubscriptionToServer(subscription: PushSubscription, retries = 3): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        console.log('Subscription sent to server successfully');
        return;
      }
      
      throw new Error(`Server responded with ${response.status}`);
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed:`, error);
      if (i === retries - 1) {
        // Dernière tentative échouée, sauvegarder pour plus tard
        localStorage.setItem('pendingPushSubscription', JSON.stringify(subscription));
        throw error;
      }
      // Attendre avant de réessayer
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

export async function subscribeUserToPush() {
  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  });

  await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: { 'Content-Type': 'application/json' }
  });
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
