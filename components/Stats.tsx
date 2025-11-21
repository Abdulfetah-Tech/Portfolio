import React from 'react';
import { ACHIEVEMENTS } from '../constants';
import { Trophy, Star, Gem, CheckCircle } from 'lucide-react';

const Stats: React.FC = () => {
  const getIcon = (type: string) => {
    const baseClasses = "h-8 w-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6";
    switch(type) {
      case 'trophy': return <Trophy className={`${baseClasses} text-yellow-500`} />;
      case 'star': return <Star className={`${baseClasses} text-primary`} />;
      case 'diamond': return <Gem className={`${baseClasses} text-blue-500`} />;
      default: return <CheckCircle className={`${baseClasses} text-green-500`} />;
    }
  };

  return (
    <section className="pb-20 bg-slate-50 -mt-24 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-10/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-xl rounded-lg">
              <div className="px-4 py-5 flex-auto">
                <h3 className="text-2xl font-bold text-center mb-8 text-slate-800">Key Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ACHIEVEMENTS.map((achievement) => (
                    <div key={achievement.id} className="group text-center p-4 hover:bg-purple-50 rounded-xl transition-colors duration-300">
                      <div className="flex justify-center mb-4 bg-slate-50 w-16 h-16 rounded-full items-center mx-auto transition-transform group-hover:scale-105 group-hover:shadow-md">
                        {getIcon(achievement.iconType)}
                      </div>
                      <h5 className="text-xl font-bold text-slate-800">{achievement.title}</h5>
                      <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;