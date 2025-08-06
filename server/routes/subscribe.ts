import { NextApiRequest, NextApiResponse } from 'next';
import webpush from 'web-push';

const VAPID_PUBLIC_KEY = "BHDMDbReXycnfSAfoU2RJ_jkl00LFDG1st-DaPwg0cqymnsw7yWL7CNEK1iLeorXRgjrpuQpXLnuJFOPBuSpJTE";
const VAPID_PRIVATE_KEY = "TW6fkihlnbbDmiUFLshFxzw0ng58AIFPCowrqxP2EXE";

webpush.setVapidDetails(
  'mailto:you@example.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const subscription = req.body;
    // Tu peux stocker en DB ici

    await webpush.sendNotification(subscription, JSON.stringify({
      title: "Bienvenue sur DjelfaQuiz!",
      body: "Merci de t'être abonné aux notifications."
    }));

    res.status(201).json({ success: true });
  } else {
    res.status(405).end();
  }
}
