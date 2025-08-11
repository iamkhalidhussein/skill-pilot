import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';
import { ApiResponse, LoginRequest, RegisterRequest, OtpRequest, User } from '../../types';
import { mockAuthApi } from '../../services/mockApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: async (args: any) => {
    // Mock API implementation
    try {
      let result;
      const { url, method, body } = args;
      
      switch (url) {
        case '/login':
          result = await mockAuthApi.login(body);
          break;
        case '/register':
          result = await mockAuthApi.register(body);
          break;
        case '/verify-otp':
          result = await mockAuthApi.verifyOtp(body);
          break;
        case '/resend-otp':
          result = await mockAuthApi.resendOtp(body);
          break;
        case '/forgot-password':
          result = await mockAuthApi.forgotPassword(body);
          break;
        case '/reset-password':
          result = await mockAuthApi.resetPassword(body);
          break;
        case '/refresh-token':
          result = await mockAuthApi.refreshToken();
          break;
        case '/profile':
          result = await mockAuthApi.getProfile('2'); // Mock user ID
          break;
        default:
          throw new Error('Endpoint not found');
      }
      
      return { data: result };
    } catch (error: any) {
      return { error: error.data || { success: false, message: 'Unknown error' } };
    }
  },
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<{ user: User; token: string }>, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<ApiResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    verifyOtp: builder.mutation<ApiResponse<{ user: User; token: string }>, OtpRequest>({
      query: (otpData) => ({
        url: '/verify-otp',
        method: 'POST',
        body: otpData,
      }),
    }),
    resendOtp: builder.mutation<ApiResponse, { email: string }>({
      query: (data) => ({
        url: '/resend-otp',
        method: 'POST',
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<ApiResponse, { email: string }>({
      query: (data) => ({
        url: '/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<ApiResponse, { token: string; password: string }>({
      query: (data) => ({
        url: '/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    refreshToken: builder.mutation<ApiResponse<{ token: string }>, void>({
      query: () => ({
        url: '/refresh-token',
        method: 'POST',
      }),
    }),
    getProfile: builder.query<ApiResponse<User>, void>({
      query: () => '/profile',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
} = authApi;