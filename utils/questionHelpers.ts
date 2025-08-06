import { Question, Answer } from '../types';

export const getQuestionText = (question: Question, language: 'ar' | 'fr'): string => {
  if (language === 'fr' && question.questionTextFr) {
    return question.questionTextFr;
  }
  return question.questionText;
};

export const getAnswerText = (answer: Answer, language: 'ar' | 'fr'): string => {
  if (language === 'fr' && answer.textFr) {
    return answer.textFr;
  }
  return answer.text;
};
