/**
 * Standard Regex for Email Validation
 * Ensures basic structure: text@text.domain
 */
export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

/**
 * Regex for Phone Number Validation
 * Requires starting with + and allows 6-20 digits/symbols (spaces, hyphens, parentheses).
 */
export const PHONE_REGEX = /^\+\s*\d[\d\s\-\(\)]{5,20}\d$/;
