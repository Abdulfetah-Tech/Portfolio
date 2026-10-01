import { 
  SKILL_CATEGORIES, 
  FEATURED_PROJECTS, 
  ARCHITECTURE_FLOWS 
} from '../config/portfolio';

export type SearchCategoryFilter = 'all' | 'skills' | 'projects' | 'architecture';

export interface SearchItem {
  id: string;
  type: 'skill' | 'project' | 'architecture';
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tags: string[];
  targetSection: string; // e.g. '#skills', '#projects', '#architecture'
  actionPayload: {
    skillCategory?: string;
    skillName?: string;
    projectId?: string;
    projectFilter?: string;
    flowId?: string;
    nodeId?: string;
  };
}

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // 1. Index Skills & Skill Categories
  SKILL_CATEGORIES.forEach((catGroup) => {
    // Index the category itself
    items.push({
      id: `skill-cat-${catGroup.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      type: 'skill',
      title: catGroup.category,
      subtitle: `Skill Category (${catGroup.skills.length} competencies)`,
      category: 'Skills Category',
      description: catGroup.description,
      tags: catGroup.skills.slice(0, 6),
      targetSection: '#skills',
      actionPayload: {
        skillCategory: catGroup.category,
      },
    });

    // Index each individual skill
    catGroup.skills.forEach((skill) => {
      items.push({
        id: `skill-${catGroup.category}-${skill}`.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        type: 'skill',
        title: skill,
        subtitle: `${catGroup.category} Skill`,
        category: catGroup.category,
        description: `Verified enterprise proficiency in ${skill} within ${catGroup.category} engineering.`,
        tags: [skill, catGroup.category],
        targetSection: '#skills',
        actionPayload: {
          skillCategory: catGroup.category,
          skillName: skill,
        },
      });
    });
  });

  // 2. Index Featured Projects
  FEATURED_PROJECTS.forEach((project) => {
    items.push({
      id: `proj-${project.id}`,
      type: 'project',
      title: project.title,
      subtitle: project.subtitle,
      category: project.filterCategories?.[0] || 'Full-Stack Project',
      description: `${project.description} ${project.problemSolved}`,
      tags: [...project.technologies, ...(project.filterCategories || [])],
      targetSection: '#projects',
      actionPayload: {
        projectId: project.id,
        projectFilter: project.filterCategories?.[0] || 'All',
      },
    });

    // Also index prominent features of projects
    project.keyFeatures.slice(0, 4).forEach((feat, fIdx) => {
      const [featName, ...featRest] = feat.split(':');
      items.push({
        id: `proj-feat-${project.id}-${fIdx}`,
        type: 'project',
        title: `${project.title}: ${featName.trim()}`,
        subtitle: `Feature in ${project.title}`,
        category: 'Project Feature',
        description: featRest.join(':').trim() || feat,
        tags: [project.title, ...project.technologies.slice(0, 3)],
        targetSection: '#projects',
        actionPayload: {
          projectId: project.id,
        },
      });
    });
  });

  // 3. Index Architecture Notes & Flows
  ARCHITECTURE_FLOWS.forEach((flow) => {
    // Index the overall architecture flow
    items.push({
      id: `arch-${flow.id}`,
      type: 'architecture',
      title: flow.title,
      subtitle: flow.subtitle,
      category: 'System Architecture',
      description: flow.flowSummary,
      tags: flow.nodes.map((n) => n.label),
      targetSection: '#architecture',
      actionPayload: {
        flowId: flow.id,
      },
    });

    // Index individual architecture nodes & mechanism notes
    flow.nodes.forEach((node) => {
      items.push({
        id: `arch-node-${flow.id}-${node.id}`,
        type: 'architecture',
        title: `${node.label} (${flow.title})`,
        subtitle: node.sublabel,
        category: 'Architecture Mechanism',
        description: `${node.description} Tech: ${node.tech}`,
        tags: [node.tech, node.label, flow.title],
        targetSection: '#architecture',
        actionPayload: {
          flowId: flow.id,
          nodeId: node.id,
        },
      });
    });
  });

  return items;
}

export function searchItems(
  items: SearchItem[],
  query: string,
  filter: SearchCategoryFilter = 'all'
): SearchItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    if (filter === 'all') {
      return items.slice(0, 8); // Return top curated items on empty query
    }
    return items.filter((item) => item.type === filter.slice(0, -1) || item.type === filter).slice(0, 8);
  }

  const tokens = trimmed.split(/\s+/).filter(Boolean);

  return items.filter((item) => {
    // Filter by category type if selected
    if (filter !== 'all') {
      if (filter === 'skills' && item.type !== 'skill') return false;
      if (filter === 'projects' && item.type !== 'project') return false;
      if (filter === 'architecture' && item.type !== 'architecture') return false;
    }

    const searchableText = `${item.title} ${item.subtitle} ${item.category} ${item.description} ${item.tags.join(' ')}`.toLowerCase();

    // Must match all query tokens
    return tokens.every((token) => searchableText.includes(token));
  });
}
