import * as migration_20251107_192544 from './20251107_192544';
import * as migration_20251111_230224 from './20251111_230224';

export const migrations = [
  {
    up: migration_20251107_192544.up,
    down: migration_20251107_192544.down,
    name: '20251107_192544',
  },
  {
    up: migration_20251111_230224.up,
    down: migration_20251111_230224.down,
    name: '20251111_230224'
  },
];
