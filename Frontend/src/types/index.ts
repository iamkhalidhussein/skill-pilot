export interface User {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'student' | 'supervisor';
  isVerified: boolean;
  currentLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Question {
  _id?: string;
  competencyId: number; // 1-22
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  createdAt?: string;
}

export interface TestSession {
  _id?: string;
  userId: string;
  step: 1 | 2 | 3;
  questions: Question[];
  answers: number[];
  score: number;
  level: string;
  startTime: string;
  endTime?: string;
  timeLimit: number; // in seconds
  status: 'in-progress' | 'completed' | 'expired';
  createdAt?: string;
}

export interface Certificate {
  _id?: string;
  userId: string;
  level: string;
  score: number;
  issueDate: string;
  certificateId: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'supervisor';
}

export interface OtpRequest {
  email: string;
  otp: string;
}

export interface TestAnswer {
  questionId: string;
  answer: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
  errors?: string[];
}