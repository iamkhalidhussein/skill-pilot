import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Award, Home } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

interface TestResultState {
  score: number;
  level: string;
  certificate?: {
    _id: string;
    certificateId: string;
    level: string;
    score: number;
    issueDate: string;
  };
}

export const TestResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as TestResultState;

  if (!state) {
    navigate('/dashboard');
    return null;
  }

  const { score, level, certificate } = state;
  const passed = level !== 'Failed';
  const canProceed = score >= 75 && (level === 'A2' || level === 'B2');

  const getNextStep = (): number => {
    if (level === 'A2' && canProceed) return 2;
    if (level === 'B2' && canProceed) return 3;
    return 1;
  };

  const getLevelDescription = (level: string): string => {
    const descriptions: Record<string, string> = {
      'Failed': 'Unfortunately, you did not meet the minimum requirements.',
      'A1': 'Basic digital competency level achieved.',
      'A2': 'Elementary digital competency level achieved.',
      'B1': 'Intermediate digital competency level achieved.',
      'B2': 'Upper-intermediate digital competency level achieved.',
      'C1': 'Advanced digital competency level achieved.',
      'C2': 'Proficient digital competency level achieved.',
    };
    return descriptions[level] || '';
  };

  const getScoreColor = (score: number): string => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-blue-600';
    if (score >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number): string => {
    if (score >= 75) return 'bg-green-50 border-green-200';
    if (score >= 50) return 'bg-blue-50 border-blue-200';
    if (score >= 25) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {passed ? (
              <CheckCircle className="w-10 h-10 text-green-600" />
            ) : (
              <XCircle className="w-10 h-10 text-red-600" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test {passed ? 'Completed' : 'Failed'}
          </h1>
          <p className="text-gray-600">
            {passed ? 'Congratulations on completing your assessment!' : 'Better luck next time!'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Score Card */}
          <Card className={`text-center ${getScoreBackground(score)}`}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Score</h3>
              <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                {Math.round(score)}%
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${
                  score >= 75 ? 'bg-green-500' :
                  score >= 50 ? 'bg-blue-500' :
                  score >= 25 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${Math.min(score, 100)}%` }}
              />
            </div>
          </Card>

          {/* Level Card */}
          <Card className="text-center">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Achievement Level</h3>
              <div className={`text-2xl font-bold ${
                passed ? 'text-blue-600' : 'text-red-600'
              }`}>
                {level}
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              {getLevelDescription(level)}
            </p>
          </Card>
        </div>

        {/* Certificate Section */}
        {certificate && (
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Certificate Earned!</h3>
                <p className="text-gray-600">
                  Certificate ID: {certificate.certificateId}
                </p>
                <p className="text-sm text-gray-500">
                  Issued on {new Date(certificate.issueDate).toLocaleDateString()}
                </p>
              </div>
              <Link to="/certificates">
                <Button variant="outline">
                  View Certificate
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Performance Breakdown */}
        <Card className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Questions Answered</span>
              <span className="font-semibold">44/44</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Correct Answers</span>
              <span className="font-semibold">{Math.round((score / 100) * 44)}/44</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Accuracy Rate</span>
              <span className={`font-semibold ${getScoreColor(score)}`}>
                {Math.round(score)}%
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
          <div className="space-y-4">
            {level === 'Failed' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  Unfortunately, you cannot retake Step 1. Please contact support if you believe this is an error.
                </p>
              </div>
            )}
            
            {canProceed && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm mb-3">
                  Excellent work! You've qualified to proceed to Step {getNextStep()}.
                </p>
                <Link to="/test">
                  <Button size="sm">
                    Take Step {getNextStep()}
                  </Button>
                </Link>
              </div>
            )}

            {passed && !canProceed && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  You've achieved the {level} level! You can continue practicing or explore other learning resources.
                </p>
              </div>
            )}
          </div>

          <div className="flex space-x-4 mt-6">
            <Link to="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            {passed && (
              <Link to="/certificates" className="flex-1">
                <Button className="w-full">
                  <Award className="w-4 h-4 mr-2" />
                  View Certificates
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};