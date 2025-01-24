// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Documents } from './collections/Documents'
import { Clients } from './collections/Clients'
import { Newsletter } from './collections/Newsletter'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Documents, Clients, Newsletter],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    uploadthingStorage({
      collections: {
        documents: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read',
        logLevel: 'Error',
      },
    }),
  ],
})
