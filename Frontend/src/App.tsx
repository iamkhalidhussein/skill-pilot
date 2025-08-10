import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Header } from './components/layout/Header';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { VerifyOtpPage } from './pages/auth/VerifyOtpPage';
import { DashboardPage } from './pages/student/DashboardPage';
import { TestPage } from './pages/student/TestPage';
import { TestResultPage } from './pages/student/TestResultPage';
import { CertificatesPage } from './pages/student/CertificatesPage';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify-otp" element={<VerifyOtpPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/test" 
                element={
                  <ProtectedRoute>
                    <TestPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/test-result" 
                element={
                  <ProtectedRoute>
                    <TestResultPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/certificates" 
                element={
                  <ProtectedRoute>
                    <CertificatesPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;