import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';
import { ApiResponse, User, Question, TestSession, Certificate } from '../../types';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/admin',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['AdminUser', 'AdminQuestion', 'AdminTest', 'AdminStats'],
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse<{ users: User[]; total: number }>, { page: number; limit: number; search?: string }>({
      query: ({ page, limit, search }) => ({
        url: '/users',
        params: { page, limit, search },
      }),
      providesTags: ['AdminUser'],
    }),
    deleteUser: builder.mutation<ApiResponse, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AdminUser'],
    }),
    getQuestions: builder.query<ApiResponse<{ questions: Question[]; total: number }>, { page: number; limit: number; competency?: number; level?: string }>({
      query: ({ page, limit, competency, level }) => ({
        url: '/questions',
        params: { page, limit, competency, level },
      }),
      providesTags: ['AdminQuestion'],
    }),
    createQuestion: builder.mutation<ApiResponse<Question>, Omit<Question, '_id' | 'createdAt'>>({
      query: (questionData) => ({
        url: '/questions',
        method: 'POST',
        body: questionData,
      }),
      invalidatesTags: ['AdminQuestion'],
    }),
    updateQuestion: builder.mutation<ApiResponse<Question>, Question>({
      query: ({ _id, ...questionData }) => ({
        url: `/questions/${_id}`,
        method: 'PUT',
        body: questionData,
      }),
      invalidatesTags: ['AdminQuestion'],
    }),
    deleteQuestion: builder.mutation<ApiResponse, string>({
      query: (questionId) => ({
        url: `/questions/${questionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AdminQuestion'],
    }),
    getTestSessions: builder.query<ApiResponse<{ sessions: TestSession[]; total: number }>, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: '/test-sessions',
        params: { page, limit },
      }),
      providesTags: ['AdminTest'],
    }),
    getStats: builder.query<ApiResponse<{
      totalUsers: number;
      totalTests: number;
      totalCertificates: number;
      levelDistribution: Record<string, number>;
    }>, void>({
      query: () => '/stats',
      providesTags: ['AdminStats'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useGetTestSessionsQuery,
  useGetStatsQuery,
} = adminApi;