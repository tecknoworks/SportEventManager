export function isValidPhoneNumber(phoneNumber: string) {
  let pattern = /^\+?\d{0,3}[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
  return pattern.test(phoneNumber);
}
