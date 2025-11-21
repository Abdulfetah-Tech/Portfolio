import React from 'react';
import { EXPERIENCE, EDUCATION } from '../constants';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap mb-12">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center group">
              <Briefcase className="mr-3 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" /> Experience
            </h2>
            <div className="relative border-l-2 border-purple-100 ml-3 pl-8 space-y-12">
              {EXPERIENCE.map((exp) => (
                <div key={exp.id} className="relative group">
                  <div className="absolute -left-[41px] bg-primary h-6 w-6 rounded-full border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-125"></div>
                  <div className="bg-slate-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800">{exp.role}</h3>
                    <h4 className="text-lg text-primary font-medium mb-2">{exp.company}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                      <span className="flex items-center group/item">
                        <Calendar size={14} className="mr-1 transition-transform group-hover/item:text-primary group-hover/item:scale-110"/> {exp.date}
                      </span>
                      <span className="flex items-center group/item">
                        <MapPin size={14} className="mr-1 transition-transform group-hover/item:text-primary group-hover/item:scale-110"/> {exp.location}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4 mt-12 lg:mt-0">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center group">
              <GraduationCap className="mr-3 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" /> Education
            </h2>
            <div className="relative border-l-2 border-purple-100 ml-3 pl-8 space-y-12">
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="relative group">
                   <div className="absolute -left-[41px] bg-secondary h-6 w-6 rounded-full border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-125"></div>
                  <div className="bg-slate-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800">{edu.degree}</h3>
                    <h4 className="text-lg text-secondary font-medium mb-2">{edu.school}</h4>
                    <div className="flex items-center text-sm text-slate-500 group/item">
                      <Calendar size={14} className="mr-1 transition-transform group-hover/item:text-secondary group-hover/item:scale-110"/> {edu.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;