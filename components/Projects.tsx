import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { FolderGit2, MapPin, ChevronRight, Github, ExternalLink, X } from 'lucide-react';
import { ProjectItem } from '../types';

// Skeleton Loader Component
const ProjectSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full animate-pulse">
    <div className="h-48 bg-slate-200" />
    <div className="p-8 flex-grow flex flex-col">
      <div className="mb-4 space-y-3">
        <div className="h-8 bg-slate-200 rounded w-3/4" />
        <div className="flex gap-2">
          <div className="h-4 bg-slate-200 rounded w-24" />
          <div className="h-4 bg-slate-200 rounded w-24" />
        </div>
      </div>
      <div className="h-4 bg-slate-200 rounded w-1/3 mb-6" />
      <div className="space-y-2 mb-6">
        <div className="h-3 bg-slate-200 rounded" />
        <div className="h-3 bg-slate-200 rounded" />
        <div className="h-3 bg-slate-200 rounded w-5/6" />
      </div>
      <div className="mt-auto">
        <div className="flex gap-4 mb-6 border-b border-slate-100 pb-4">
          <div className="h-4 bg-slate-200 rounded w-16" />
          <div className="h-4 bg-slate-200 rounded w-20" />
        </div>
        <div className="flex gap-2 mb-6">
          <div className="h-6 w-16 bg-slate-200 rounded-full" />
          <div className="h-6 w-20 bg-slate-200 rounded-full" />
          <div className="h-6 w-14 bg-slate-200 rounded-full" />
        </div>
        <div className="w-full h-12 bg-slate-200 rounded-xl" />
      </div>
    </div>
  </div>
);

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedProject]);

  const openModal = (project: ProjectItem) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="projects" className="py-20 bg-slate-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">Featured Projects</h2>
          <p className="mt-4 text-lg text-slate-600">Innovative solutions driving digital transformation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading ? (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          ) : (
            PROJECTS.map((project) => (
                <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 flex flex-col h-full cursor-pointer" onClick={() => openModal(project)}>
                  <div className="h-48 bg-gradient-to-r from-primary to-secondary flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <FolderGit2 className="text-white opacity-30 w-24 h-24 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:opacity-60" />
                    
                    {/* Links on Card */}
                    <div className="absolute top-4 right-4 flex gap-2 z-10 translate-y-[-150%] group-hover:translate-y-0 transition-transform duration-300">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank" 
                          rel="noreferrer"
                          className="bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-lg hover:scale-110 group/link"
                          title="View Source Code"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={20} className="transition-transform group-hover/link:rotate-6" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl}
                          target="_blank" 
                          rel="noreferrer"
                          className="bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-white hover:text-primary transition-all duration-300 shadow-lg hover:scale-110 group/link"
                          title="View Live Demo"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={20} className="transition-transform group-hover/link:rotate-12" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                      <div className="flex items-center text-sm text-slate-500">
                          <MapPin size={14} className="mr-1 transition-transform group-hover:scale-110 group-hover:text-primary" /> {project.location}
                          <span className="mx-2">•</span>
                          <span>{project.date}</span>
                      </div>
                    </div>
                    <p className="text-primary font-medium text-sm mb-4 uppercase tracking-wider">{project.role}</p>
                    
                    {/* Problem Statement Preview */}
                    <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">The Challenge</h4>
                        <p className="text-slate-700 text-sm line-clamp-2">{project.problemStatement}</p>
                    </div>

                    <div className="text-slate-600 leading-relaxed mb-6 flex-grow">
                      <p className="line-clamp-3">{project.description}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-purple-50 text-primary text-xs font-semibold rounded-full border border-purple-100">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-3 py-1 bg-slate-50 text-slate-500 text-xs font-semibold rounded-full border border-slate-100">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); openModal(project); }}
                        className="w-full py-3 px-4 rounded-xl border-2 border-purple-100 text-primary font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center group/btn"
                      >
                        View Details
                        <ChevronRight size={18} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Close Button */}
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors backdrop-blur-sm shadow-sm"
            >
              <X size={24} />
            </button>

            {/* Hero Header */}
            <div className="h-40 bg-gradient-to-r from-primary to-secondary relative flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-white opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                 <FolderGit2 className="text-white opacity-20 w-20 h-20 transform -rotate-12" />
            </div>

            <div className="p-8 sm:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">{selectedProject.title}</h3>
                  <p className="text-primary font-semibold text-lg">{selectedProject.role}</p>
                </div>
                <div className="text-sm text-slate-500 flex flex-col gap-1 md:text-right min-w-fit">
                   <span className="flex items-center md:justify-end"><MapPin size={14} className="mr-1"/> {selectedProject.location}</span>
                   <span>{selectedProject.date}</span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none mb-8">
                {/* Full Problem Statement in Modal */}
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 mb-8">
                    <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Problem Statement</h4>
                    <p className="text-slate-700 leading-relaxed text-lg m-0">{selectedProject.problemStatement}</p>
                </div>

                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">Project Overview</h4>
                <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">{selectedProject.description}</p>
              </div>

              <div className="mb-10">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="px-4 py-1.5 bg-purple-50 text-primary text-sm font-medium rounded-full border border-purple-100 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-100 pt-8">
                {selectedProject.githubUrl && (
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 inline-flex justify-center items-center px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-lg hover:shadow-slate-900/30 font-medium"
                  >
                    <Github size={20} className="mr-2" /> View Code
                  </a>
                )}
                {selectedProject.demoUrl && (
                  <a 
                    href={selectedProject.demoUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 inline-flex justify-center items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-purple-800 transition-all hover:-translate-y-1 shadow-lg hover:shadow-purple-500/30 font-medium"
                  >
                    <ExternalLink size={20} className="mr-2" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;