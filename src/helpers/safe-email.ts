import normalizeEmail from 'normalize-email';

export const safeEmail = (input: string) =>
  normalizeEmail(input.toLowerCase().trim());
