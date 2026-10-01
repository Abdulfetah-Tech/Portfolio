import { EducationItem, CertificationItem } from './types';
import { PORTFOLIO_CONFIG, FEATURED_PROJECTS, SKILL_CATEGORIES, CURRICULUM_MODULES } from './config/portfolio';

export const EDUCATION: EducationItem[] = [
  {
    id: '1',
    degree: "Bachelor of Science - BSc, Computer Science and Engineering",
    school: "Adama Science and Technology University",
    date: "06/2020 – 06/2025"
  },
  {
    id: '2',
    degree: "Advanced Digital Skill Training in Full-Stack Software Development",
    school: "Addis Ababa University",
    date: "01/2026 – Present"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: '1',
    title: "Full-Stack Web Application Development with .NET & Angular",
    issuer: "Qiyas Advanced Digital Training & Addis Ababa University",
    date: "2026 - 2027",
    credentialId: "QIYAS-AAU-FSNET-2027"
  },
  {
    id: '2',
    title: "CCNAv7: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "2024",
    credentialId: "CISCO-CCNA7-ITN"
  },
  {
    id: '3',
    title: "CCNAv7: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    date: "2024",
    credentialId: "CISCO-CCNA7-SRWE"
  },
  {
    id: '4',
    title: "CCNAv7: Enterprise Networking, Security, and Automation",
    issuer: "Cisco Networking Academy",
    date: "2024",
    credentialId: "CISCO-CCNA7-ENSA"
  },
  {
    id: '5',
    title: "Data Analysis Fundamentals",
    issuer: "Udacity",
    date: "2023",
    credentialId: "UDACITY-DA-2023"
  },
  {
    id: '6',
    title: "Academic Integrity",
    issuer: "e-SHE (Ministry of Education Ethiopia)",
    date: "2023",
    credentialId: "ESHE-AI-CERT"
  },
  {
    id: '7',
    title: "Strategies for Successful Online Learning",
    issuer: "e-SHE (Ministry of Education Ethiopia)",
    date: "2023",
    credentialId: "ESHE-SSOL-CERT"
  }
];

export const SYSTEM_INSTRUCTION = `
You are an engineering representative and assistant for Abdulfetah Bedru.
Your goal is to answer technical questions from recruiters, hiring managers, and visitors about Abdulfetah's qualifications, architecture approach, projects, and skills.

Core Profile:
Name: ${PORTFOLIO_CONFIG.name}
Role: ${PORTFOLIO_CONFIG.role}
Headline: ${PORTFOLIO_CONFIG.supportingHeadline}
Introduction: ${PORTFOLIO_CONFIG.shortIntro}
About: ${PORTFOLIO_CONFIG.aboutText}
Contact: ${PORTFOLIO_CONFIG.email} | Location: ${PORTFOLIO_CONFIG.location}
GitHub: ${PORTFOLIO_CONFIG.github}
LinkedIn: ${PORTFOLIO_CONFIG.linkedin}

Education:
${EDUCATION.map(e => `- ${e.degree}, ${e.school} (${e.date})`).join('\n')}

Technical Skills:
${SKILL_CATEGORIES.map(c => `• ${c.category}: ${c.skills.join(', ')}`).join('\n')}

Featured Projects:
${FEATURED_PROJECTS.map(p => `- ${p.title} (${p.subtitle}): ${p.problemSolved}\n  Architecture: ${p.architectureType}\n  Tech: ${p.technologies.join(', ')}`).join('\n')}

12-Module Technical Training Curriculum (.NET & Angular):
${CURRICULUM_MODULES.map(m => `Module ${m.number}: ${m.title} - Topics: ${m.topics.join(', ')}`).join('\n')}

Instructions:
1. Always be professional, technical, direct, and concise.
2. Emphasize Abdulfetah's real strengths in .NET 10, ASP.NET Core Web APIs, Entity Framework Core, PostgreSQL, Angular Signals, and clean decoupled architectures.
3. Clearly distinguish formal curriculum training from commercial engagements.
4. If asked about contact information or hiring, provide his email (${PORTFOLIO_CONFIG.email}) and LinkedIn profile.
`;
