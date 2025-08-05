import React from 'react';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  let message = '';
  if (percentage < 30) {
    message = "لا بأس، المعرفة رحلة مستمرة!";
  } else if (percentage < 60) {
    message = "نتيجة جيدة! استمر في استكشاف تاريخ الجلفة.";
  } else if (percentage < 90) {
    message = "عمل رائع! معلوماتك ممتازة.";
  } else {
    message = "مذهل! أنت حقًا خبير في تاريخ المنطقة!";
  }

  const strokeDashoffset = 283 - (283 * percentage) / 100;

  return (
    <div className="text-center bg-[#fdf6e3] p-8 rounded-lg shadow-2xl border-4 border-amber-800/20">
      <h2 className="text-4xl font-bold text-[#5c4033] mb-6" style={{ textShadow: '1px 1px #d4c6a8' }}>
        اكتملت الرحلة!
      </h2>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle className="text-amber-200" strokeWidth="10" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
          <circle 
             className="text-[#c95b2c]"
             strokeWidth="10" 
             strokeDasharray="283"
             strokeDashoffset={strokeDashoffset}
             strokeLinecap="round" 
             stroke="currentColor" 
             fill="transparent" 
             r="45" 
             cx="50" 
             cy="50" 
             style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.8s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-[#5c4033]">{percentage}%</span>
            <span className="text-lg text-[#6f4f28]">{score} / {totalQuestions}</span>
        </div>
      </div>

      <p className="text-xl text-[#6f4f28] mb-8">{message}</p>
      
      <button
        onClick={onRestart}
        className="bg-[#c95b2c] hover:bg-[#a94a20] text-white font-bold py-3 px-10 rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg border-b-4 border-[#893b1a]"
      >
        ابدأ رحلة جديدة
      </button>
    </div>
  );
};

export default Results;