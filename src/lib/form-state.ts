export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  type?: 'error' | 'success';
} | null;
