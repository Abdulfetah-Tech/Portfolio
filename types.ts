export interface PersonalProfile {
  name: string;
  role: string;
  secondaryCapability?: string;
  supportingHeadline: string;
  shortIntro: string;
  aboutText: string;
  email: string;
  phone?: string;
  location: string;
  github: string;
  githubUsername: string;
  linkedin: string;
  cvUrl: string;
}

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: string[];
}

export interface SkillRadarItem {
  subject: string;
  score: number;
  fullMark: number;
  details: string;
  category: 'Backend' | 'Frontend' | 'Database' | 'Security' | 'DevOps' | 'Testing' | 'Mobile';
}

export interface ArchitectureDiagramNode {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  tech: string;
  codeSnippet?: string;
}

export interface ArchitectureFlow {
  id: string;
  title: string;
  subtitle: string;
  flowSummary: string;
  nodes: ArchitectureDiagramNode[];
}

export interface ProjectMilestone {
  phase: 'Planning' | 'Architecture' | 'Development' | 'Testing' | 'Deployment';
  status: 'Completed' | 'In Progress' | 'Production' | 'Optimizing';
  period?: string;
  summary: string;
  deliverables: string[];
}

export interface ProjectMetrics {
  linesOfCode: number;
  linesOfCodeFormatted: string;
  testCoverage: number;
  testCount: number;
  deploymentFrequency: string;
  buildPassRate: number;
  p99Latency?: string;
  containerSize?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problemSolved: string;
  technologies: string[];
  architectureType: string;
  architectureFlow?: string[];
  keyFeatures: string[];
  categories?: string[];
  filterCategories?: ('Web' | 'Mobile' | 'Backend' | 'Full Stack')[];
  tradeCategories?: string[];
  milestones?: ProjectMilestone[];
  metrics?: ProjectMetrics;
  githubUrl?: string;
  demoUrl?: string;
  hasCaseStudy: boolean;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface EngineeringStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  practices: string[];
  deliverables: string;
  iconName: string;
}

export interface JourneyMilestone {
  stage: string;
  focus: string;
  description: string;
  keySkills: string[];
}

export interface CurriculumModule {
  number: number;
  title: string;
  topics: string[];
  outcome: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  date: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  credentialId?: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updated: string;
  url: string;
  tags: string[];
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
