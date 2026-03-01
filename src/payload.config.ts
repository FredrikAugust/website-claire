import path from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Installation } from './collections/Installation'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Home } from './globals/Home'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const s3Endpoint = process.env.S3_ENDPOINT ?? 'http://localhost:9000'
const databaseCaFromFilePath = path.resolve(dirname, '../certs/rds-global-bundle.pem')
const databaseCaFromEnv = process.env.DATABASE_CA_CERT?.replace(/\\n/g, '\n')
const databaseCaFromFile = (() => {
  try {
    return readFileSync(databaseCaFromFilePath, 'utf8')
  } catch {
    return undefined
  }
})()
const databaseCa = databaseCaFromFile ?? databaseCaFromEnv
const databaseUri = process.env.DATABASE_URI || ''
const databaseConnectionString = databaseUri
  .replace(/([?&])sslmode=[^&]*&?/i, '$1')
  .replace(/[?&]$/, '')

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  serverURL: process.env.SERVER_URL!,
  collections: [Users, Media, Installation],
  globals: [Home],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseConnectionString,
      ssl: databaseCa
        ? {
            ca: databaseCa,
            rejectUnauthorized: true,
          }
        : undefined,
    },
    prodMigrations: migrations,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'claire-media-uploads',
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        endpoint: s3Endpoint,
        forcePathStyle: s3Endpoint.startsWith('http://localhost:9000'), // if we're using minio for local testing
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION!,
      },
    }),
  ],
})
