import { isAdmin } from '@/access/is-admin'
import type { CollectionConfig } from 'payload'

export const Newsletter: CollectionConfig = {
  slug: 'newsletter',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: isAdmin,
    create: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
    },
  ],
}
