let globalToast: any = null;

type Toast = {
  title: string;
  description: string;
  status: string;
  duration?: number;
  isClosable?: boolean;
};

export const initializeErrorHandlingService = (toastFunction: any) => {
  globalToast = toastFunction;
};

const displayToast = ({ title, description, status, duration = 9000, isClosable = true }: Toast) => {
  globalToast({
    title,
    description,
    status,
    duration,
    isClosable,
  });
};

export function handleApiError(error: any) {
  let message = error.response?.data?.message || error.response?.data || 'Something went wrong with the API call. Please try again later.';
  displayToast({
    title: 'API Error',
    description: message,
    status: 'error',
  });
}

export function handleGenericError(error: any) {
  displayToast({
    title: 'Error',
    description: error || 'Something unexpected went wrong. Please try again later.',
    status: 'error',
  });
}

export function handleGenericSuccess(message: string) {
  displayToast({
    title: 'Succcess',
    description: message,
    status: 'success',
  });
}
