export const SITE_URL = 'https://VeraFanYunan.github.io';

// The sub-path the site is served under. On GitHub Pages this is the repo name,
export const BASE_PATH = '/blog';

// Builds an internal link that works both under a sub-path and on a root domain.
export const withBase = (path = '') => `${BASE_PATH}/${path.replace(/^\/+/, '')}`;

export const AUTHOR = {
  firstName: 'Vera',
  lastName: 'Fan',
  location: 'Toronto, Canada',
};

export const SITE_TITLE = 'Vera';
export const SITE_DESCRIPTION =
  'Notes on building AI agents that learn from experience: memory, evaluation and the systems around them.';


export const LINKS = {
  linkedin: 'linkedin.com/in/verafanyn',
  github: '',
  orcid: '',
  email: '',
};

export const authorDisplayName = () =>
  [AUTHOR.firstName, AUTHOR.lastName].filter(Boolean).join(' ');
