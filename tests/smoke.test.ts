import { describe, it, expect } from 'vitest';
import { loadProfile } from '../src/lib/profile';

describe('smoke', () => {
  it('loads a profile object with required keys', () => {
    const p = loadProfile();
    expect(p.name).toBeTruthy();
    expect(p.headline).toBeTruthy();
    expect(Array.isArray(p.interests)).toBe(true);
  });
});
