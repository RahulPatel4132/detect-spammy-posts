import badWords from '../utils/badWords';

export interface ModerationResult {
  status: 'ACCEPTED' | 'FLAGGED';
  reasons?: string[];
}

const URL_REGEX = /(https?:\/\/|www\.)\S+/i;
const REPEAT_REGEX = /(.)\1{4,}/i; // sequences like "looooool"

export function evaluatePost(text: string): ModerationResult {
  const reasons: string[] = [];

  // 1. Bad‑word filter (case‑insensitive exact match)
  const lower = text.toLowerCase();
  const hits = badWords.filter(w => lower.includes(w));
  if (hits.length) reasons.push(`Offensive language: ${hits.join(', ')}`);

  // 2. Obvious spam heuristics
  if (URL_REGEX.test(text)) reasons.push('Contains link');
  if (REPEAT_REGEX.test(text)) reasons.push('Excessive repeated characters');

  // 3. Very short + all caps look spammy too
  if (text.length < 5) reasons.push('Too short');
  if (text === text.toUpperCase() && /[A-Z]/.test(text))
    reasons.push('All caps');

  return reasons.length
    ? { status: 'FLAGGED', reasons }
    : { status: 'ACCEPTED' };
}
