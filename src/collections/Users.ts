import { isAdminOrSelf } from '@/access/is-admin-or-self'
import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: isAdminOrSelf,
    create: () => true,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'exceededLimit',
      type: 'checkbox',
    },
    {
      name: 'companyName',
      type: 'text',
    },
    {
      name: 'clients',
      type: 'relationship',
      relationTo: 'clients',
      hasMany: true,
    },
    {
      name: 'documents',
      type: 'relationship',
      relationTo: 'documents',
      hasMany: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
    {
      name: 'subscriptionLimit',
      type: 'number',
      defaultValue: 5,
    },
    {
      name: 'subscription',
      type: 'group',
      fields: [
        {
          name: 'stripeCustomerId',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'stripeSubscriptionId',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'stripePriceId',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'stripeCurrentPeriodEnd',
          type: 'date',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'incomplete',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Canceled', value: 'canceled' },
            { label: 'Past Due', value: 'past_due' },
            { label: 'Trialing', value: 'trialing' },
            { label: 'Incomplete', value: 'incomplete' },
            { label: 'Incomplete Expired', value: 'incomplete_expired' },
          ],
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'plan',
          type: 'select',
          options: [
            { label: 'Free', value: 'free' },
            { label: 'Pro Monthly', value: 'pro_monthly' },
            { label: 'Pro Yearly', value: 'pro_yearly' },
            { label: 'AppSumo Lifetime', value: 'appsumo_lifetime' },
          ],
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'appsumoLicenseId',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'appsumoTier',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'appsumoActivationCode',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'appsumoActivatedAt',
          type: 'date',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'appsumoWebhookData',
          type: 'json',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
}
