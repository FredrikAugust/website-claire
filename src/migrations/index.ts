import * as migration_20251107_192544 from './20251107_192544';
import * as migration_20251111_230224 from './20251111_230224';
import * as migration_20251112_124921 from './20251112_124921';
import * as migration_20260308_173743 from './20260308_173743';
import * as migration_20260310_090128_website_redesign_schema from './20260310_090128_website_redesign_schema';
import * as migration_20260310_094236_editorial_headings from './20260310_094236_editorial_headings';

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
    name: '20260308_173743',
  },
  {
    up: migration_20260310_090128_website_redesign_schema.up,
    down: migration_20260310_090128_website_redesign_schema.down,
    name: '20260310_090128_website_redesign_schema',
  },
  {
    up: migration_20260310_094236_editorial_headings.up,
    down: migration_20260310_094236_editorial_headings.down,
    name: '20260310_094236_editorial_headings'
  },
];
