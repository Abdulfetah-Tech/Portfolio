import React from 'react';
import { PROFILE } from '../constants';
import { Download, ChevronRight, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const keySkills = ["Full-Stack Development", "AI & Machine Learning", "Data Science", "Network Engineering"];

  // Using DiceBear API for a professional looking avatar based on initials/seed
  // Replace this URL with your local image path (e.g., "/profile.jpg") when you have one.
  const profileImage = "https://api.dicebear.com/9.x/avataaars/svg?seed=Abdulfetah&backgroundColor=b6e3f4&clothing=blazerAndShirt&eyes=happy&eyebrows=default&mouth=smile";

  return (
    <section className="relative pt-20 pb-32 flex content-center items-center justify-center min-h-[90vh] bg-gradient-to-br from-slate-50 to-purple-50 overflow-hidden">
      {/* Animated Wave Styles */}
      <style>{`
        @keyframes move-forever {
          0% {
            transform: translate3d(-90px,0,0);
          }
          100% { 
            transform: translate3d(85px,0,0);
          }
        }
        .parallax > use {
          animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
        }
        .parallax > use:nth-child(1) {
          animation-delay: -2s;
          animation-duration: 7s;
          fill: rgba(168, 85, 247, 0.1);
        }
        .parallax > use:nth-child(2) {
          animation-delay: -3s;
          animation-duration: 10s;
          fill: rgba(168, 85, 247, 0.2);
        }
        .parallax > use:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 13s;
          fill: rgba(107, 33, 168, 0.15);
        }
        .parallax > use:nth-child(4) {
          animation-delay: -5s;
          animation-duration: 20s;
          fill: rgba(107, 33, 168, 0.05);
        }
      `}</style>
      
      {/* Abstract shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-purple-200 blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-200 blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>

      {/* Wave Animation */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <svg className="w-full h-[15vh] min-h-[100px] max-h-[150px]" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" />
            <use xlinkHref="#gentle-wave" x="48" y="3" />
            <use xlinkHref="#gentle-wave" x="48" y="5" />
            <use xlinkHref="#gentle-wave" x="48" y="7" />
          </g>
        </svg>
      </div>

      <div className="container relative mx-auto px-4 z-10">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center lg:text-left">
            <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wide text-primary uppercase bg-purple-100 rounded-full animate-fade-in">
              Open to Work
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-4 text-slate-900 animate-slide-up">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{PROFILE.name}</span>
            </h1>
            <h2 className="text-2xl font-semibold text-slate-600 mb-4 animate-slide-up delay-100">
              {PROFILE.title}
            </h2>

            {/* Key Skills List */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6 animate-slide-up delay-200">
              {keySkills.map((skill) => (
                <span key={skill} className="px-3 py-1 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-full shadow-sm hover:border-primary hover:text-primary transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>

            <p className="mt-2 text-lg text-slate-500 mb-8 leading-relaxed animate-slide-up delay-300">
              {PROFILE.summary}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up delay-500">
              <a 
                href="#projects" 
                className="group inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-purple-800 transition-all shadow-lg shadow-purple-500/30"
              >
                View Projects <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a 
                href={PROFILE.resume}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center px-6 py-3 text-base font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-primary transition-all hover:scale-105 active:scale-95"
              >
                Download Resume <Download className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </a>
              <a 
                href="#contact"
                className="group inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-1 active:scale-95 ring-1 ring-white/10"
              >
                Get in Touch <Mail className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-5/12 px-4 mt-12 lg:mt-0 animate-slide-in-right">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-2xl rounded-2xl bg-white/30 backdrop-blur-sm border border-white/50 transform rotate-2 hover:rotate-0 transition-transform duration-500 group">
              <img 
                alt={PROFILE.name}
                src={profileImage}
                className="w-full align-middle rounded-2xl bg-slate-100 transition-all duration-500" 
              />
              {/* Decorative Quote */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg max-w-xs border border-slate-100 hidden md:block animate-bounce-slow">
                 <p className="text-sm font-medium text-slate-700 italic">"Innovating with AI & Code"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;