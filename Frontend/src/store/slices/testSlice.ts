import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TestSession, Question } from '../../types';

interface TestState {
  currentTest: TestSession | null;
  questions: Question[];
  currentQuestionIndex: number;
  answers: number[];
  timeRemaining: number;
  isLoading: boolean;
}

const initialState: TestState = {
  currentTest: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  timeRemaining: 0,
  isLoading: false,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setCurrentTest: (state, action: PayloadAction<TestSession>) => {
      state.currentTest = action.payload;
      state.questions = action.payload.questions;
      state.answers = new Array(action.payload.questions.length).fill(-1);
      state.timeRemaining = action.payload.timeLimit;
    },
    setAnswer: (state, action: PayloadAction<{ questionIndex: number; answer: number }>) => {
      state.answers[action.payload.questionIndex] = action.payload.answer;
    },
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
    },
    decrementTime: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      }
    },
    resetTest: (state) => {
      state.currentTest = null;
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.answers = [];
      state.timeRemaining = 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCurrentTest,
  setAnswer,
  setCurrentQuestionIndex,
  decrementTime,
  resetTest,
  setLoading,
} = testSlice.actions;

export default testSlice.reducer;