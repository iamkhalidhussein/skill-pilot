import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';
import { ApiResponse, TestSession, Question, Certificate } from '../../types';
import { mockTestApi } from '../../services/mockApi';

export const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: async (args: any) => {
    // Mock API implementation
    try {
      let result;
      const { url, method, body } = args;
      
      switch (url) {
        case '/start':
          result = await mockTestApi.startTest(body);
          break;
        case '/submit':
          result = await mockTestApi.submitTest(body);
          break;
        case '/current':
          result = await mockTestApi.getCurrentTest();
          break;
        case '/history':
          result = await mockTestApi.getTestHistory();
          break;
        case '/certificates':
          result = await mockTestApi.getCertificates();
          break;
        default:
          throw new Error('Endpoint not found');
      }
      
      return { data: result };
    } catch (error: any) {
      return { error: error.data || { success: false, message: 'Unknown error' } };
    }
  },
  tagTypes: ['TestSession', 'Certificate'],
  endpoints: (builder) => ({
    startTest: builder.mutation<ApiResponse<TestSession>, { step: number }>({
      query: (data) => ({
        url: '/start',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['TestSession'],
    }),
    submitTest: builder.mutation<ApiResponse<{ score: number; level: string; certificate?: Certificate }>, {
      sessionId: string;
      answers: number[];
    }>({
      query: (data) => ({
        url: '/submit',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['TestSession', 'Certificate'],
    }),
    getCurrentTest: builder.query<ApiResponse<TestSession>, void>({
      query: () => '/current',
      providesTags: ['TestSession'],
    }),
    getTestHistory: builder.query<ApiResponse<TestSession[]>, void>({
      query: () => '/history',
      providesTags: ['TestSession'],
    }),
    getCertificates: builder.query<ApiResponse<Certificate[]>, void>({
      query: () => '/certificates',
      providesTags: ['Certificate'],
    }),
    downloadCertificate: builder.mutation<Blob, string>({
      query: (certificateId) => ({
        url: `/certificate/${certificateId}/download`,
        method: 'GET',
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useStartTestMutation,
  useSubmitTestMutation,
  useGetCurrentTestQuery,
  useGetTestHistoryQuery,
  useGetCertificatesQuery,
  useDownloadCertificateMutation,
} = testApi;