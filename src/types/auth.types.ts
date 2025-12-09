
export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface UseLoginFormReturn {
  formData: LoginFormData;
  errors: LoginFormErrors;
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  clearError: (field: keyof LoginFormErrors) => void;
}