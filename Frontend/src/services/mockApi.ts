import { User, LoginRequest, RegisterRequest, OtpRequest, ApiResponse, TestSession, Question, Certificate } from '../types';

// Mock database
const mockUsers: User[] = [
  {
    _id: '1',
    email: 'admin@testschool.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isVerified: true,
    currentLevel: null,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    email: 'student@testschool.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'student',
    isVerified: true,
    currentLevel: 'A2',
    createdAt: new Date().toISOString(),
  }
];

const mockQuestions: Question[] = [
  // Step 1 Questions (A1 & A2)
  {
    _id: '1',
    competencyId: 1,
    level: 'A1',
    questionText: 'What is the primary function of an operating system?',
    options: [
      'To provide internet connectivity',
      'To manage computer hardware and software resources',
      'To create documents',
      'To play multimedia files'
    ],
    correctAnswer: 1,
    explanation: 'An operating system manages computer hardware and software resources.',
  },
  {
    _id: '2',
    competencyId: 1,
    level: 'A1',
    questionText: 'Which of the following is a web browser?',
    options: ['Microsoft Word', 'Google Chrome', 'Adobe Photoshop', 'Windows Media Player'],
    correctAnswer: 1,
  },
  {
    _id: '3',
    competencyId: 2,
    level: 'A1',
    questionText: 'What does "URL" stand for?',
    options: [
      'Universal Resource Locator',
      'Uniform Resource Locator',
      'Universal Reference Link',
      'Uniform Reference Locator'
    ],
    correctAnswer: 1,
  },
  // Add more questions to reach 44 for testing
];

// Generate more mock questions to reach 44 total
for (let i = 4; i <= 44; i++) {
  mockQuestions.push({
    _id: i.toString(),
    competencyId: (i % 22) + 1,
    level: i <= 22 ? 'A1' : 'A2',
    questionText: `Sample question ${i} for digital competency assessment?`,
    options: [
      `Option A for question ${i}`,
      `Option B for question ${i}`,
      `Option C for question ${i}`,
      `Option D for question ${i}`
    ],
    correctAnswer: Math.floor(Math.random() * 4),
  });
}

let mockTestSessions: TestSession[] = [];
let mockCertificates: Certificate[] = [];

// Utility functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateToken = (): string => {
  return 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9);
};

const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};

const findUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user._id === id);
};

// Mock API functions
export const mockAuthApi = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<{ user: User; token: string }>> => {
    await delay(1000); // Simulate network delay

    const { email, password } = credentials;

    // Mock password validation
    const validPasswords: Record<string, string> = {
      'admin@testschool.com': 'admin123',
      'student@testschool.com': 'student123',
    };

    const user = findUserByEmail(email);
    
    if (!user) {
      throw {
        data: {
          success: false,
          message: 'User not found',
        }
      };
    }

    if (validPasswords[email] !== password) {
      throw {
        data: {
          success: false,
          message: 'Invalid credentials',
        }
      };
    }

    const token = generateToken();

    return {
      success: true,
      data: { user, token },
      message: 'Login successful',
    };
  },

  register: async (userData: RegisterRequest): Promise<ApiResponse> => {
    await delay(1000);

    const existingUser = findUserByEmail(userData.email);
    if (existingUser) {
      throw {
        data: {
          success: false,
          message: 'User already exists',
        }
      };
    }

    const newUser: User = {
      _id: (mockUsers.length + 1).toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      isVerified: false,
      currentLevel: null,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    return {
      success: true,
      message: 'Registration successful. Please verify your email.',
    };
  },

  verifyOtp: async (otpData: OtpRequest): Promise<ApiResponse<{ user: User; token: string }>> => {
    await delay(1000);

    const user = findUserByEmail(otpData.email);
    if (!user) {
      throw {
        data: {
          success: false,
          message: 'User not found',
        }
      };
    }

    // Mock OTP validation (accept any 6-digit code)
    if (otpData.otp.length !== 6) {
      throw {
        data: {
          success: false,
          message: 'Invalid OTP',
        }
      };
    }

    user.isVerified = true;
    const token = generateToken();

    return {
      success: true,
      data: { user, token },
      message: 'Email verified successfully',
    };
  },

  resendOtp: async (data: { email: string }): Promise<ApiResponse> => {
    await delay(500);
    return {
      success: true,
      message: 'OTP sent successfully',
    };
  },

  forgotPassword: async (data: { email: string }): Promise<ApiResponse> => {
    await delay(1000);
    const user = findUserByEmail(data.email);
    if (!user) {
      throw {
        data: {
          success: false,
          message: 'User not found',
        }
      };
    }

    return {
      success: true,
      message: 'Password reset link sent to your email',
    };
  },

  resetPassword: async (data: { token: string; password: string }): Promise<ApiResponse> => {
    await delay(1000);
    return {
      success: true,
      message: 'Password reset successfully',
    };
  },

  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    await delay(500);
    return {
      success: true,
      data: { token: generateToken() },
      message: 'Token refreshed',
    };
  },

  getProfile: async (userId: string): Promise<ApiResponse<User>> => {
    await delay(500);
    const user = findUserById(userId);
    if (!user) {
      throw {
        data: {
          success: false,
          message: 'User not found',
        }
      };
    }

    return {
      success: true,
      data: user,
      message: 'Profile retrieved successfully',
    };
  },
};

export const mockTestApi = {
  startTest: async (data: { step: number }): Promise<ApiResponse<TestSession>> => {
    await delay(1000);

    const testSession: TestSession = {
      _id: (mockTestSessions.length + 1).toString(),
      userId: '2', // Mock student user
      step: data.step as 1 | 2 | 3,
      questions: mockQuestions.slice(0, 44), // First 44 questions
      answers: new Array(44).fill(-1),
      score: 0,
      level: '',
      startTime: new Date().toISOString(),
      timeLimit: 44 * 60, // 44 minutes (1 minute per question)
      status: 'in-progress',
      createdAt: new Date().toISOString(),
    };

    mockTestSessions.push(testSession);

    return {
      success: true,
      data: testSession,
      message: 'Test started successfully',
    };
  },

  submitTest: async (data: { sessionId: string; answers: number[] }): Promise<ApiResponse<{ score: number; level: string; certificate?: Certificate }>> => {
    await delay(2000);

    const session = mockTestSessions.find(s => s._id === data.sessionId);
    if (!session) {
      throw {
        data: {
          success: false,
          message: 'Test session not found',
        }
      };
    }

    // Calculate score (mock calculation)
    const correctAnswers = data.answers.filter((answer, index) => {
      return answer === session.questions[index].correctAnswer;
    }).length;

    const score = (correctAnswers / session.questions.length) * 100;
    
    // Determine level based on step and score
    let level = '';
    if (session.step === 1) {
      if (score < 25) level = 'Failed';
      else if (score < 50) level = 'A1';
      else if (score < 75) level = 'A2';
      else level = 'A2';
    } else if (session.step === 2) {
      if (score < 25) level = 'A2';
      else if (score < 50) level = 'B1';
      else if (score < 75) level = 'B2';
      else level = 'B2';
    } else {
      if (score < 25) level = 'B2';
      else if (score < 50) level = 'C1';
      else level = 'C2';
    }

    // Update session
    session.answers = data.answers;
    session.score = score;
    session.level = level;
    session.status = 'completed';
    session.endTime = new Date().toISOString();

    // Generate certificate if passed
    let certificate: Certificate | undefined;
    if (level !== 'Failed') {
      certificate = {
        _id: (mockCertificates.length + 1).toString(),
        userId: session.userId,
        level,
        score,
        issueDate: new Date().toISOString(),
        certificateId: `CERT-${Date.now()}`,
      };
      mockCertificates.push(certificate);
    }

    // Update user's current level
    const user = findUserById(session.userId);
    if (user && level !== 'Failed') {
      user.currentLevel = level as any;
    }

    return {
      success: true,
      data: { score, level, certificate },
      message: 'Test submitted successfully',
    };
  },

  getCurrentTest: async (): Promise<ApiResponse<TestSession>> => {
    await delay(500);
    const currentTest = mockTestSessions.find(s => s.status === 'in-progress');
    
    if (!currentTest) {
      throw {
        data: {
          success: false,
          message: 'No active test found',
        }
      };
    }

    return {
      success: true,
      data: currentTest,
      message: 'Current test retrieved',
    };
  },

  getTestHistory: async (): Promise<ApiResponse<TestSession[]>> => {
    await delay(500);
    const completedTests = mockTestSessions.filter(s => s.status === 'completed');
    
    return {
      success: true,
      data: completedTests,
      message: 'Test history retrieved',
    };
  },

  getCertificates: async (): Promise<ApiResponse<Certificate[]>> => {
    await delay(500);
    
    return {
      success: true,
      data: mockCertificates,
      message: 'Certificates retrieved',
    };
  },
};