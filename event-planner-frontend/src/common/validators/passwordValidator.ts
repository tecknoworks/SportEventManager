export function validatePassword(password: string) {
  if (password.length < 12) return 'Password must be at least 12 characters long.';

  if (/\s/.test(password)) return 'Password must not contain spaces.';

  if (!/[a-z]/.test(password)) return 'Password must include at least one lowercase letter.';

  if (!/[A-Z]/.test(password)) return 'Password must include at least one uppercase letter.';

  if (!/[0-9]/.test(password)) return 'Password must include at least one number.';

  if (!/[^A-Za-z0-9]/.test(password)) return 'Password must include at least one special character.';

  return '';
}
