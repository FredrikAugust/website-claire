import * as migration_20251107_192544 from './20251107_192544';

export const migrations = [
  {
    up: migration_20251107_192544.up,
    down: migration_20251107_192544.down,
    name: '20251107_192544'
  },
];
