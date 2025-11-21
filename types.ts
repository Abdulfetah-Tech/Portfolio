export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  date: string;
  location: string;
  description?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  date: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  date: string;
  location: string;
  role: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  iconType: 'diamond' | 'star' | 'trophy' | 'check';
}

export enum ChatSender {
  USER = 'user',
  AI = 'ai',
}

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  text: string;
}