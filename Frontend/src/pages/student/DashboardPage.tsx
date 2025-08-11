import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';
import { useGetTestHistoryQuery, useGetCertificatesQuery } from '../../store/api/testApi';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const DashboardPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: testHistoryResponse } = useGetTestHistoryQuery();
  const { data: certificatesResponse } = useGetCertificatesQuery();

  const testHistory = testHistoryResponse?.data || [];
  const certificates = certificatesResponse?.data || [];
  const completedTests = testHistory.filter(test => test.status === 'completed');
  const lastTest = completedTests[0];

  const getNextStep = (): number => {
    if (!user?.currentLevel) return 1;
    
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const currentIndex = levels.indexOf(user.currentLevel);
    
    if (currentIndex < 2) return 1; // A1, A2 -> Step 1
    if (currentIndex < 4) return 2; // B1, B2 -> Step 2
    return 3; // C1, C2 -> Step 3
  };

  const canTakeNextStep = (): boolean => {
    if (!user?.currentLevel) return true;
    
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const currentIndex = levels.indexOf(user.currentLevel);
    
    // Can proceed to next step if current level allows it
    return currentIndex === 1 || currentIndex === 3; // A2 or B2
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="mt-2 text-gray-600">
            Track your progress and continue your digital competency journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-center p-5 border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{completedTests.length}</h3>
            <p className="text-gray-600">Tests Completed</p>
          </Card>

          <Card className="text-center p-5 border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{certificates.length}</h3>
            <p className="text-gray-600">Certificates Earned</p>
          </Card>

          <Card className="text-center p-5 border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {user?.currentLevel || 'None'}
            </h3>
            <p className="text-gray-600">Current Level</p>
          </Card>

          <Card className="text-center p-5 border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {lastTest ? Math.round(lastTest.score) : 0}%
            </h3>
            <p className="text-gray-600">Last Score</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card className='p-5 border-gray-200'>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Take Step {getNextStep()} Assessment
                  </h3>
                  <p className="text-sm text-gray-600">
                    {!user?.currentLevel ? 'Start your competency assessment journey' :
                     canTakeNextStep() ? 'Continue to the next level' :
                     'Practice your current level'}
                  </p>
                </div>
                <Link to="/test">
                  <Button>Start Test</Button>
                </Link>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">View Certificates</h3>
                  <p className="text-sm text-gray-600">
                    Download and share your achievements
                  </p>
                </div>
                <Link to="/certificates">
                  <Button variant="outline">View All</Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Recent Test History */}
          <Card className='p-5 border-gray-200'>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Test History</h2>
            <div className="space-y-4">
              {completedTests.slice(0, 5).map((test) => (
                <div key={test._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Step {test.step}</p>
                      <p className="text-sm text-gray-600">
                        Level: {test.level}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{Math.round(test.score)}%</p>
                    <p className="text-xs text-gray-500">
                      {new Date(test.createdAt!).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {completedTests.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No tests completed yet</p>
                  <p className="text-sm">Start your first assessment to see your progress here</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Progress Chart */}
        <Card className="mt-8 p-5 border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Progress</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((step) => {
                const stepTests = completedTests.filter(test => test.step === step);
                const bestScore = stepTests.length > 0 ? Math.max(...stepTests.map(test => test.score)) : 0;
                const isCompleted = stepTests.length > 0;
                const currentStep = getNextStep();
                // const isAvailable = step <= currentStep || isCompleted;

                return (
                  <div key={step} className={`p-4 rounded-lg border-2 ${
                    isCompleted ? 'border-green-200 bg-green-50' :
                    step === currentStep ? 'border-blue-200 bg-blue-50' :
                    'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Step {step}</h3>
                      {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {step === 1 ? 'Levels A1 & A2' :
                       step === 2 ? 'Levels B1 & B2' :
                       'Levels C1 & C2'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Best Score:</span>
                      <span className={`font-semibold ${
                        bestScore >= 75 ? 'text-green-600' :
                        bestScore >= 25 ? 'text-yellow-600' :
                        'text-gray-400'
                      }`}>
                        {bestScore > 0 ? `${Math.round(bestScore)}%` : 'Not taken'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};