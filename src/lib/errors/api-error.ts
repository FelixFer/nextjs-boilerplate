import { isAxiosError, type AxiosError } from 'axios';

import type { ApiErrorResponse } from '@/lib/api/types';

const DEFAULT_MESSAGE = 'Something went wrong. Please try again.';

/**
 * Normalized error thrown by the API client. Carries the HTTP status and the
 * raw response body (`details`) for callers that need them.
 */
export class ApiError extends Error {
  readonly status?: number;
  readonly code?: string;
  readonly details?: unknown;

  constructor(
    message: string,
    options?: { status?: number; code?: string; details?: unknown },
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = options?.status;
    this.code = options?.code;
    this.details = options?.details;
  }

  static fromAxiosError(error: AxiosError<ApiErrorResponse>): ApiError {
    const message =
      error.response?.data?.message ?? error.message ?? DEFAULT_MESSAGE;

    return new ApiError(message, {
      status: error.response?.status,
      code: error.code,
      details: error.response?.data,
    });
  }
}

/**
 * Safe, human-readable message for any thrown value. Use this in toasts and
 * error states instead of accessing error.message directly.
 */
export function getApiErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return DEFAULT_MESSAGE;
}
