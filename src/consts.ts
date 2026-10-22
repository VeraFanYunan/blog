export const SITE_URL = 'https://VeraFanYunan.github.io';

export const BASE_PATH = '/blog';

// Builds an internal link that works both under a sub-path and on a root domain.
export const withBase = (path = '') => `${BASE_PATH}/${path.replace(/^\/+/, '')}`;

// Used for the byline and citations.
export const AUTHOR = {
  firstName: 'Vera',
  lastName: 'Fan',
  location: 'Toronto, Canada',
};

export const SITE_TITLE = 'Vera Fan';
export const SITE_DESCRIPTION =
  'Notes on engineering AI systems that learn from feedback: agent memory, evaluation loops, and the data systems around models.';


export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/verafanyn/',
  github: '',
  orcid: '',
  email: '',
};

export const authorDisplayName = () =>
  [AUTHOR.firstName, AUTHOR.lastName].filter(Boolean).join(' ');
