import type { Question } from '../types';
import { Difficulty } from '../types';

export const questions: Question[] = [
  {
    questionText: "كم تبعد الجلفة عن العاصمة الجزائر؟",
    questionTextFr: "À quelle distance Djelfa se trouve-t-elle de la capitale Alger ?",
    answers: [
      { text: "100 كم", textFr: "100 km", correct: false },
      { text: "300 كم", textFr: "300 km", correct: true },
      { text: "500 كم", textFr: "500 km", correct: false },
      { text: "200 كم", textFr: "200 km", correct: false },
    ],
    difficulty: Difficulty.Easy,
  },
  {
    questionText: "ما هي الولاية التي تحد الجلفة من الشرق؟",
    questionTextFr: "Quelle wilaya borde Djelfa à l'est ?",
    answers: [
      { text: "الأغواط", textFr: "Laghouat", correct: false },
      { text: "المسيلة", textFr: "M'Sila", correct: true },
      { text: "غرداية", textFr: "Ghardaïa", correct: false },
      { text: "المدية", textFr: "Médéa", correct: false },
    ],
    difficulty: Difficulty.Easy,
  },
  {
    questionText: "ما اسم الوادي الذي يمر بالجزء الغربي للجلفة؟",
    questionTextFr: "Quel est le nom de la vallée qui traverse la partie ouest de Djelfa ?",
    answers: [
      { text: "وادي الشلف", textFr: "Oued Cheliff", correct: false },
      { text: "وادي جدي", textFr: "Oued Djedi", correct: true },
      { text: "وادي الصومام", textFr: "Oued Soummam", correct: false },
      { text: "وادي مزاب", textFr: "Oued M'Zab", correct: false },
    ],
    difficulty: Difficulty.Easy,
  },
  {
    questionText: "ما هو المناخ السائد في منطقة الجلفة؟",
    questionTextFr: "Quel est le climat dominant dans la région de Djelfa ?",
    answers: [
      { text: "صحراوي حار", textFr: "Désertique chaud", correct: false },
      { text: "انتقالي بين المتوسطي والصحراوي", textFr: "Transition entre méditerranéen et désertique", correct: true },
      { text: "متوسطي رطب", textFr: "Méditerranéen humide", correct: false },
      { text: "قاري بارد", textFr: "Continental froid", correct: false },
    ],
    difficulty: Difficulty.Easy,
  },
  {
    questionText: "ماذا تعني كلمة 'الجلفة' حسب أصل التسمية؟",
    questionTextFr: "Que signifie le mot 'Djelfa' selon l'étymologie ?",
    answers: [
      { text: "أرض خصبة", textFr: "Terre fertile", correct: false },
      { text: "قشرة أرض جافة تتشكل بعد الجفاف", textFr: "Croûte de terre sèche formée après sécheresse", correct: true },
      { text: "جبل أبيض", textFr: "Montagne blanche", correct: false },
      { text: "نبع ماء عذب", textFr: "Source d'eau douce", correct: false },
    ],
    difficulty: Difficulty.Easy,
  },
  {
    questionText: "من هو قائد المقاومة الشعبية الذي اتخذ من الجلفة قاعدة مهمة له؟",
    questionTextFr: "Qui est le leader de la résistance populaire qui a fait de Djelfa une base importante ?",
    answers: [
      { text: "الشيخ بوعمامة", textFr: "Cheikh Bouamama", correct: false },
      { text: "الأمير عبد القادر", textFr: "Émir Abdelkader", correct: true },
      { text: "المقراني", textFr: "El Mokrani", correct: false },
      { text: "فاطمة نسومر", textFr: "Fatma N'Soumer", correct: false },
    ],
    difficulty: Difficulty.Easy,
  },
  {
    questionText: "ما هو النبات الذي يغطي مساحات شاسعة من سهوب الجلفة؟",
    questionTextFr: "Quelle plante couvre de vastes étendues des steppes de Djelfa ?",
    answers: [
      { text: "الحلفاء", textFr: "L'alfa", correct: true },
      { text: "النخيل", textFr: "Les palmiers", correct: false },
      { text: "الزيتون", textFr: "L'olivier", correct: false },
      { text: "الصبار", textFr: "Le cactus", correct: false },
    ],
    difficulty: Difficulty.Easy,
  },
  {
    questionText: "ما هو الحيوان الأكثر تربية في منطقة الجلفة؟",
    questionTextFr: "Quel est l'animal le plus élevé dans la région de Djelfa ?",
    answers: [
      { text: "الأغنام", textFr: "Les moutons", correct: true },
      { text: "الأبقار", textFr: "Les vaches", correct: false },
      { text: "الجمال", textFr: "Les chameaux", correct: false },
      { text: "الخيول", textFr: "Les chevaux", correct: false },
    ],
    difficulty: Difficulty.Easy,
  },
  {
    questionText: "ما هي الولاية التي تحد الجلفة من الشمال؟",
    questionTextFr: "Quelle wilaya borde Djelfa au nord ?",
    answers: [
      { text: "المدية", textFr: "Médéa", correct: true },
      { text: "المسيلة", textFr: "M'Sila", correct: false },
      { text: "الأغواط", textFr: "Laghouat", correct: false },
      { text: "تيارت", textFr: "Tiaret", correct: false },
    ],
    difficulty: Difficulty.Easy,
  },
  {
    questionText: "ما هو ثالث جبل ملح في العالم ويقع بالقرب من مدينة الجلفة؟",
    questionTextFr: "Quelle est la troisième montagne de sel au monde située près de Djelfa ?",
    answers: [
      { text: "جبل بوكحيل", textFr: "Djebel Boukahil", correct: false },
      { text: "جبل الملح (حجر الملح)", textFr: "Djebel El Melh (roche de sel)", correct: true },
      { text: "جبل العمور", textFr: "Djebel Amour", correct: false },
      { text: "جبل زكار", textFr: "Djebel Zakkar", correct: false },
    ],
    difficulty: Difficulty.Medium,
  },
  {
    questionText: "إلى أي عصر يعود تاريخ وجود الإنسان بالمنطقة حسب أقدم الآثار؟",
    questionTextFr: "À quelle époque remonte la présence humaine dans la région selon les vestiges les plus anciens ?",
    answers: [
      { text: "العصر الحجري الحديث", textFr: "Néolithique", correct: false },
      { text: "العصر الحجري القديم (حوالي 200,000 سنة)", textFr: "Paléolithique (environ 200 000 ans)", correct: true },
      { text: "العصر البرونزي", textFr: "Âge du bronze", correct: false },
      { text: "العصر الروماني", textFr: "Époque romaine", correct: false },
    ],
    difficulty: Difficulty.Medium,
  },
  {
    questionText: "ما اسم الموقع الأثري المشهور بنقوش 'الجاموسين العتيقين'؟",
    questionTextFr: "Quel est le nom du site archéologique célèbre pour ses gravures des 'Buffles anciens' ?",
    answers: [
      { text: "زكار", textFr: "Zakkar", correct: false },
      { text: "عين الناقة", textFr: "Aïn Naga", correct: true },
      { text: "قلتة السطل", textFr: "Gueltet Stel", correct: false },
      { text: "عمورة", textFr: "Ammoura", correct: false },
    ],
    difficulty: Difficulty.Medium,
  },
  {
    questionText: "ما هو الاسم العلمي للصنوبر الحلبي الذي يكوّن غابات الجلفة؟",
    questionTextFr: "Quel est le nom scientifique du pin d'Alep qui forme les forêts de Djelfa ?",
    answers: [
      { text: "Pinus halepensis", textFr: "Pinus halepensis", correct: true },
      { text: "Cedrus atlantica", textFr: "Cedrus atlantica", correct: false },
      { text: "Quercus ilex", textFr: "Quercus ilex", correct: false },
      { text: "Juniperus phoenicea", textFr: "Juniperus phoenicea", correct: false },
    ],
    difficulty: Difficulty.Hard,
  },
  {
    questionText: "من هو الرسام المستشرق الذي قضى جزءاً من حياته في بوسعادة ورسم حياة أولاد نايل؟",
    questionTextFr: "Qui est le peintre orientaliste qui a vécu une partie de sa vie à Bou Saâda et a peint la vie des Ouled Naïl ?",
    answers: [
      { text: "إتيان دينيه", textFr: "Étienne Dinet", correct: true },
      { text: "أوجين ديلاكروا", textFr: "Eugène Delacroix", correct: false },
      { text: "أوجين فرومنتان", textFr: "Eugène Fromentin", correct: false },
      { text: "جان ليون جيروم", textFr: "Jean-Léon Gérôme", correct: false },
    ],
    difficulty: Difficulty.Hard,
  },
];
