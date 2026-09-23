/**
 * Profile helpers. Learners fill docs/PROFILE.md in Lab 01.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export type Profile = {
  name: string;
  headline: string;
  bio: string;
  audience: string;
  interests: string[];
};

const FALLBACK: Profile = {
  name: 'Your Name',
  headline: 'Personal branding site (course stub)',
  bio: 'Replace this stub after Lab 01 Interview. Write docs/PROFILE.md then wire pages in Lab 04.',
  audience: 'Hiring managers / peers / community',
  interests: ['AI agents', 'Web', 'Teaching'],
};

function profilePath(): string {
  const candidates = [
    join(process.cwd(), 'docs', 'PROFILE.md'),
    join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'docs', 'PROFILE.md'),
  ];
  return candidates.find((p) => existsSync(p)) || candidates[0];
}

export function loadProfile(): Profile {
  const path = profilePath();
  if (!existsSync(path)) return FALLBACK;
  const raw = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
  const get = (label: string) => {
    const m = raw.match(new RegExp(`^##\\s*${label}\\s*\\n([\\s\\S]*?)(?=^##\\s|$)`, 'm'));
    return (m?.[1] || '').trim();
  };
  const interests = get('Interests')
    .split('\n')
    .map((l) => l.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean);
  return {
    name: get('Name') || FALLBACK.name,
    headline: get('Headline') || FALLBACK.headline,
    bio: get('Bio') || FALLBACK.bio,
    audience: get('Audience') || FALLBACK.audience,
    interests: interests.length ? interests : FALLBACK.interests,
  };
}
