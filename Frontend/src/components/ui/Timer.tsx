import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { decrementTime } from '../../store/slices/testSlice';

interface TimerProps {
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
  const dispatch = useAppDispatch();
  const timeRemaining = useAppSelector((state) => state.test.timeRemaining);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, dispatch, onTimeUp]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeRemaining < 300; // Less than 5 minutes

  return (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-lg ${
      isLowTime ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
    }`}>
      <Clock className="w-5 h-5" />
      <span>{formatTime(timeRemaining)}</span>
      {isLowTime && <span className="animate-pulse">⚠️</span>}
    </div>
  );
};