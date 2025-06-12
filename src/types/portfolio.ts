export type EmploymentType = 'full-time' | 'contract';

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

export interface Employer {
  id: string;
  name: string;
  jobTitle: string;
  duration: string;
  type: EmploymentType;
  contribution: string;
  videos: Video[];
}

export interface Portfolio {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  summary: string;
  employers: Employer[];
}

// Placeholder for AI-powered portfolio parsing
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function parsePortfolioWithAI(url: string): Promise<Portfolio | null> {
  // In a real implementation, this would use an AI service to extract and summarize portfolio data
  // For now, returns null
  return null;
}
