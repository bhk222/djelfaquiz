import React from 'react';
import { Difficulty } from '../types';

interface StartScreenProps {
  onStart: (difficulty: Difficulty) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center bg-[#fdf6e3] p-8 rounded-lg shadow-2xl border-4 border-amber-800/20">
       <h1 className="text-4xl md:text-5xl font-bold text-[#5c4033] mb-4" style={{ textShadow: '1px 1px #d4c6a8' }}>
        الجلفة: رحلة عبر الزمن
      </h1>
      <p className="text-lg text-[#6f4f28] mb-8 max-w-xl mx-auto">
        اختر مستوى الصعوبة لبدء التحدي واكتشف تاريخ وجغرافية الجلفة العريقة.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button
          onClick={() => onStart(Difficulty.Easy)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg border-b-4 border-green-800"
        >
          سهل
        </button>
        <button
          onClick={() => onStart(Difficulty.Medium)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-10 rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg border-b-4 border-yellow-700"
        >
          متوسط
        </button>
        <button
          onClick={() => onStart(Difficulty.Hard)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg border-b-4 border-red-800"
        >
          صعب
        </button>
      </div>
    </div>
  );
};

export default StartScreen;