import { isAdminOrSelf } from '@/access/is-admin-or-self'
import type { CollectionConfig } from 'payload'

export const Newsletter: CollectionConfig = {
  slug: 'newsletter',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: isAdminOrSelf,
    create: () => true,
    update: isAdminOrSelf,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
    },
  ],
}
