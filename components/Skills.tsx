import React from 'react';
import { SKILLS, CERTIFICATIONS } from '../constants';
import { Award, Code2 } from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Skills Column */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center group">
              <Code2 className="mr-3 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" /> Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILLS.map((skillGroup) => (
                <div key={skillGroup.category} className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm rounded-md shadow-sm hover:border-primary hover:text-primary transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="lg:col-span-1">
             <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center group">
              <Award className="mr-3 text-secondary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" /> Certifications
            </h2>
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="group flex items-start p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-purple-50 transition-colors">
                  <Award className="w-6 h-6 text-secondary mt-1 mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
                  <div>
                    <h4 className="font-bold text-slate-800 group-hover:text-primary transition-colors">{cert.title}</h4>
                    <p className="text-sm text-slate-500">{cert.issuer}</p>
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

export default Skills;