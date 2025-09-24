
export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  email: string;
  password?: string; // Not stored in LS, but used for forms
  role: UserRole;
  fullName: string;
  college?: string;
  collegeIdProof?: string; // filename
}

export enum ApplicationStatus {
  SUBMITTED = 'Submitted',
  UNDER_REVIEW = 'Under Review',
  SHORTLISTED = 'Shortlisted',
  FINAL = 'Final',
  REJECTED = 'Rejected',
}

export interface StudentApplication {
  id: string;
  studentId: string;
  studentName: string;
  startupName: string;
  description: string;
  sector: string;
  problemSolved: string;
  targetMarket: string;
  pitchDeck: string; // filename
  status: ApplicationStatus;
  submissionDate: string;
  // Enhanced fields for detailed application
  businessModel?: string;
  fundingAmount?: string;
  teamSize?: string;
  timeline?: string;
  competitiveAdvantage?: string;
  revenueProjection?: string;
  notes?: EvaluationNote[];
}

export interface EvaluationNote {
  id: string;
  adminId: string;
  adminName: string;
  note: string;
  timestamp: string;
}
