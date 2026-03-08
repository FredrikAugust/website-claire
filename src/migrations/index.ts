import * as migration_20251107_192544 from './20251107_192544';
import * as migration_20251111_230224 from './20251111_230224';
import * as migration_20251112_124921 from './20251112_124921';
import * as migration_20260308_173743 from './20260308_173743';

export const migrations = [
  {
    up: migration_20251107_192544.up,
    down: migration_20251107_192544.down,
    name: '20251107_192544',
  },
  {
    up: migration_20251111_230224.up,
    down: migration_20251111_230224.down,
    name: '20251111_230224',
  },
  {
    up: migration_20251112_124921.up,
    down: migration_20251112_124921.down,
    name: '20251112_124921',
  },
  {
    up: migration_20260308_173743.up,
    down: migration_20260308_173743.down,
    name: '20260308_173743'
  },
];
