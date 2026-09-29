export type ProjectTechnology = {
  name: string;
  logo: string;
  usage: string;
};

export type Project = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  overview: string;
  category: string;
  role: string[];
  year: string;
  screenshot: string;
  liveUrl: string;
  githubUrl: string;
  technologies: ProjectTechnology[];
  challenge: string;
  solution: string;
  features: string[];
  process: string[];
  outcome: string;
  tags: string[];
  featured: boolean;
};

export type ProjectRecord = {
  id: string;
  name: string;
  slug?: string | null;
  description: string;
  overview?: string | null;
  category: string;
  role?: string[] | null;
  year?: string | null;
  screenshot?: string | null;
  fallback_image?: string | null;
  live_url?: string | null;
  github_url?: string | null;
  technologies?: ProjectTechnology[] | null;
  challenge?: string | null;
  solution?: string | null;
  features?: string[] | null;
  process?: string[] | null;
  outcome?: string | null;
  tags: string[];
  featured: boolean;
  display_order: number;
  is_active: boolean;
};
