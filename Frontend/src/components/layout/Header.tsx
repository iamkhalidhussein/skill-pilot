import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, GraduationCap } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/slices/authSlice';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = (): void => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Skill Pilot</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated && user && (
              <>
                {user.role === 'student' && (
                  <>
                    <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/test" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Take Test
                    </Link>
                    <Link to="/certificates" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Certificates
                    </Link>
                  </>
                )}
                {user.role === 'admin' && (
                  <>
                    <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Admin Panel
                    </Link>
                    <Link to="/admin/users" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Users
                    </Link>
                    <Link to="/admin/questions" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Questions
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {user.firstName} {user.lastName}
                  </span>
                  {user.currentLevel && (
                    <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                      {user.currentLevel}
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};