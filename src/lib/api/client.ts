import axios, { type AxiosError } from 'axios';

import { env } from '@/lib/env';
import { ApiError } from '@/lib/errors/api-error';

import type { ApiErrorResponse } from './types';

/**
 * Shared Axios instance. All HTTP calls should go through this client so
 * every request gets the same base URL, timeout, and error handling.
 */
export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Normalize every failed response into ApiError so callers never need to
// know about Axios internals.
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) =>
    Promise.reject(ApiError.fromAxiosError(error)),
);
