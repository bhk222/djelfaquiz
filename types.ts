
export interface Answer {
  text: string;
  textFr?: string;
  correct: boolean;
}

export enum Difficulty {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Hard = 'HARD',
}

export interface Question {
  questionText: string;
  questionTextFr?: string;
  answers: Answer[];
  difficulty: Difficulty;
}

export enum GameState {
  Start = 'START',
  Playing = 'PLAYING',
  Finished = 'FINISHED',
}