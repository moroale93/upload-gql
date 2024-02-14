import { getJestProjects } from '@nx/jest';

process.env.TZ = 'UTC';

export default {
  projects: getJestProjects(),
  TZ: 'utc',

  globals: {
    TZ: 'utc',
  },
};
