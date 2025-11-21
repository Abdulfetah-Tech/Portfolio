import { 
  ExperienceItem, 
  EducationItem, 
  ProjectItem, 
  SkillCategory, 
  CertificationItem,
  AchievementItem 
} from './types';

export const PROFILE = {
  name: "Abdulfetah S. Bedru",
  title: "Full-Stack Developer | AI & Data Science Enthusiast | Cisco Certified",
  email: "abdulfetahsultanbedru7@gmail.com",
  phone: "+251-940579561",
  location: "Addis Ababa, Ethiopia",
  linkedin: "https://www.linkedin.com/in/abdulfetah-s-bedru-99212227a",
  github: "https://github.com/Abdulfetah-Tech",
  resume: "/resume.pdf", // Placeholder link for the PDF
  summary: "I am a Computer Science and Engineering graduate with a strong foundation in full-stack development, networking, and system integration. My passion centers on AI, machine learning, data science, and AI-driven automation. With hands-on experience developing platforms like the Fetan Digital Platform and internships at NEO AI Technology and Sheger System PLC, I bring a blend of technical expertise and practical insight.",
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: '1',
    role: "Software Developer",
    company: "Sheger Systems",
    date: "08/2024 - 09/2024",
    location: "Addis Ababa, Ethiopia",
    description: "Focused on software development lifecycles and system optimization."
  },
  {
    id: '2',
    role: "Web Developer",
    company: "NEO AI Technologies",
    date: "07/2023 - 08/2023",
    location: "Adama, Ethiopia",
    description: "Developed and launched 3 web platforms within 2 months."
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: '1',
    degree: "Bachelor of Science - BSc, Computer Science and Engineering",
    school: "Adama Science and Technology University",
    date: "01/2021 - 01/2025"
  },
  {
    id: '2',
    degree: "Preparatory School Diploma, Natural Sciences",
    school: "Gasera Senior Secondary School",
    date: "01/2018 - 01/2021"
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: '1',
    title: "Fetan Digital Platform",
    date: "06/2025",
    location: "Adama Science and Technology University",
    role: "System Analyst & Full-Stack Developer",
    description: "Fetan is a pioneering digital marketplace designed to modernize the gig economy in Ethiopia by connecting homeowners with verified renovation and maintenance experts (plumbers, electricians, painters). As the lead developer, I engineered a solution to address market fragmentation and trust issues.\n\nKey Technical Achievements:\n• Real-Time Communication System: Built a low-latency chat infrastructure using Django Channels and WebSockets over Redis, facilitating instant negotiation between service providers and clients.\n• Geospatial Proximity Engine: Integrated Leaflet and map services to implement location-based matching, enabling users to discover the nearest available professionals with real-time distance calculation.\n• Secure Financial Infrastructure: Seamlessly integrated the Chapa payment gateway to handle secure transactions, ensuring financial safety for gig workers and customers.\n• Modular Architecture: Designed a decoupled system with a React.js frontend and Django REST Framework backend, containerized via Docker for scalable deployment.\n• Trust & Quality Assurance: Developed a sophisticated rating and review algorithm to maintain service quality and user trust.",
    tags: ["React", "Django REST Framework", "PostgreSQL", "Redis", "WebSockets", "Chapa Payment", "Docker", "Leaflet", "System Analysis"],
    githubUrl: "https://github.com/Abdulfetah-Tech",
    demoUrl: "https://example.com"
  },
  {
    id: '2',
    title: "OneGov E-Government Platform",
    date: "06/2025",
    location: "Adama Science and Technology University",
    role: "Full-Stack Developer",
    description: "A unified e-government platform streamlining public service delivery (tax filing, ID renewal) via a cloud-native microservices architecture. Features include AI-driven NLP workflows for user support, Single Sign-On (SSO) with MFA for security, and multilingual support. Built with React.js, Node.js, and MongoDB, orchestrated with Kubernetes on AWS.",
    tags: ["React", "Node.js", "MongoDB", "AWS", "Kubernetes", "AI/NLP", "Microservices"],
    githubUrl: "https://github.com/Abdulfetah-Tech",
    demoUrl: "https://example.com"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Programming & Scripting",
    skills: ["Python", "C# (ASP.NET MVC)", "Java", "C++", "R", "SQL"]
  },
  {
    category: "Web Technologies",
    skills: ["Full-Stack Developer (MEN-Stack)", "HTML/CSS", "JavaScript", "React", "Django"]
  },
  {
    category: "AI & Data Science",
    skills: ["Machine Learning", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Data Preprocessing", "Model Evaluation"]
  },
  {
    category: "Tools & Platforms",
    skills: ["Git/GitHub", "Tableau", "Power BI", "Excel", "MySQL", "PostgreSQL"]
  },
  {
    category: "Soft Skills",
    skills: ["Problem-Solving", "Agile Methods", "Teamwork", "Communication"]
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: '1',
    title: "Enhanced System Efficiency",
    description: "Improved system efficiency by 25% through advanced algorithms and AI implementation.",
    iconType: 'trophy'
  },
  {
    id: '2',
    title: "Rapid Platform Launches",
    description: "Developed and launched 3 web platforms within 2 months at NEO AI Technologies.",
    iconType: 'star'
  },
  {
    id: '3',
    title: "Boosted User Engagement",
    description: "Increased user engagement by 30% on digital platforms through data-driven enhancements.",
    iconType: 'diamond'
  },
  {
    id: '4',
    title: "Internship Training Success",
    description: "Trained a team of 5 interns in machine learning techniques.",
    iconType: 'check'
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  { id: '1', title: "CCNAv7: Introduction to Networks", issuer: "Cisco" },
  { id: '2', title: "Data Analysis Fundamentals", issuer: "Udacity" },
  { id: '3', title: "Academic Integrity", issuer: "e-SHE" },
  { id: '4', title: "Strategies for Successful Online Learning", issuer: "e-SHE" },
];

// Construct a system prompt context from the data
export const SYSTEM_INSTRUCTION = `
You are an AI assistant representing Abdulfetah S. Bedru. Your goal is to help recruiters and visitors understand Abdulfetah's qualifications.
Here is his profile data:
Name: ${PROFILE.name}
Title: ${PROFILE.title}
Summary: ${PROFILE.summary}
Contact: ${PROFILE.email}, ${PROFILE.phone}, ${PROFILE.linkedin}

Experience:
${EXPERIENCE.map(e => `- ${e.role} at ${e.company} (${e.date}): ${e.description}`).join('\n')}

Projects:
${PROJECTS.map(p => `- ${p.title}: ${p.description} (Role: ${p.role})`).join('\n')}

Skills:
${SKILLS.map(s => `${s.category}: ${s.skills.join(', ')}`).join('\n')}

Achievements:
${ACHIEVEMENTS.map(a => `- ${a.title}: ${a.description}`).join('\n')}

Certifications:
${CERTIFICATIONS.map(c => `- ${c.title} by ${c.issuer}`).join('\n')}

Instructions:
1. Be professional, polite, and concise.
2. Highlight his strengths in AI, Full-Stack Development, and Data Science.
3. If asked about specific projects like "Fetan" or "OneGov", provide details from the context.
4. If asked about contact info, provide his email or LinkedIn.
5. Keep answers relevant to a job interview context.
`;