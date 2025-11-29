export enum UserRole {
  ADMIN = 'ADMIN',
  PARTICIPANT = 'PARTICIPANT',
  GUEST = 'GUEST'
}

export interface User {
  name: string;
  email: string;
  role: UserRole;
}

export enum PaperStatus {
  SUBMITTED = 'Submitted',
  UNDER_REVIEW = 'Under Review',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected'
}

export interface Paper {
  id: string;
  title: string;
  author: string;
  abstract: string;
  status: PaperStatus;
  submissionDate: string;
  aiReview?: {
    summary: string;
    pros: string[];
    cons: string[];
    verdict: string;
  };
}

export interface Session {
  id: string;
  time: string;
  title: string;
  speaker: string;
  room: string;
  track: string;
  description?: string;
}

export interface ScheduleGenerationParams {
  theme: string;
  days: number;
  tracks: number;
}