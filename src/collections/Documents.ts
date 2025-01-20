import { isAdminOrSelf } from '@/access/is-admin-or-self'
import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  access: {
    read: isAdminOrSelf,
    create: isAdminOrSelf,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  upload: true,
}
