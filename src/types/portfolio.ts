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


