export interface Translations {
  title: string;
  subtitle: string;
  selectDifficulty: string;
  easy: string;
  medium: string;
  hard: string;
  readyMessage: string;
  question: string;
  of: string;
  finalScore: string;
  gotScore: string;
  outOf: string;
  points: string;
  playAgain: string;
  discoverMore: string;
  nextQuestion: string;
  finishQuiz: string;
  excellent: string;
  good: string;
  average: string;
  needs_improvement: string;
}

export const translations: Record<'ar' | 'fr', Translations> = {
  ar: {
    title: 'اختبر معلوماتك عن الجلفة',
    subtitle: 'اكتشف كنوز ولاية الجلفة من خلال أسئلة ممتعة ومثيرة',
    selectDifficulty: 'اختر مستوى الصعوبة',
    easy: '🌟 سهل',
    medium: '🔥 متوسط',
    hard: '⚡ صعب',
    readyMessage: 'استعد لاستكشاف تاريخ وثقافة الجلفة العريقة',
    question: 'السؤال',
    of: 'من',
    finalScore: '🏆 النتيجة النهائية',
    gotScore: 'حصلت على',
    outOf: 'من أصل',
    points: 'نقاط',
    playAgain: '🎮 لعب مرة أخرى',
    discoverMore: '📚 اكتشف المزيد',
    nextQuestion: 'السؤال التالي',
    finishQuiz: 'إنهاء الاختبار',
    excellent: '🎉 مذهل! أنت حقًا خبير في تاريخ الجلفة!',
    good: '👍 عمل رائع! معلوماتك ممتازة عن الجلفة.',
    average: '😊 نتيجة جيدة! استمر في استكشاف تاريخ الجلفة.',
    needs_improvement: '💪 لا بأس، المعرفة رحلة مستمرة! حاول مرة أخرى.'
  },
  fr: {
    title: 'Testez vos connaissances sur Djelfa',
    subtitle: 'Découvrez les trésors de la wilaya de Djelfa à travers des questions amusantes',
    selectDifficulty: 'Choisissez votre niveau de difficulté',
    easy: '🌟 Facile',
    medium: '🔥 Moyen',
    hard: '⚡ Difficile',
    readyMessage: 'Préparez-vous à explorer l\'histoire et la culture de Djelfa',
    question: 'Question',
    of: 'sur',
    finalScore: '🏆 Score Final',
    gotScore: 'Vous avez obtenu',
    outOf: 'sur',
    points: 'points',
    playAgain: '🎮 Rejouer',
    discoverMore: '📚 Découvrir plus',
    nextQuestion: 'Question suivante',
    finishQuiz: 'Terminer le quiz',
    excellent: '🎉 Fantastique! Vous êtes un vrai expert de Djelfa!',
    good: '👍 Excellent travail! Vos connaissances sur Djelfa sont impressionnantes.',
    average: '😊 Bon résultat! Continuez à explorer l\'histoire de Djelfa.',
    needs_improvement: '💪 Pas mal, l\'apprentissage est un voyage continu! Réessayez.'
  }
};

export const getTranslation = (language: 'ar' | 'fr'): Translations => {
  return translations[language];
};
