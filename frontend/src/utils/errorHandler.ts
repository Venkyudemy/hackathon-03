// Error handling utility
export const handleApiError = (error: string | undefined): string => {
  if (!error) {
    return 'An unexpected error occurred';
  }

  // Check for common network errors
  if (error.includes('Failed to fetch') || error.includes('Network error')) {
    return 'Cannot connect to backend. Please ensure the backend services are running.';
  }

  // Check for HTTP errors
  if (error.includes('404')) {
    return 'API endpoint not found. The backend service may not be available.';
  }

  if (error.includes('401') || error.includes('403')) {
    return 'Authentication failed. Please login again.';
  }

  if (error.includes('500')) {
    return 'Server error. Please try again later.';
  }

  return error;
};

export const logApiError = (endpoint: string, error: string) => {
  console.error(`[API Error] ${endpoint}:`, error);
};

