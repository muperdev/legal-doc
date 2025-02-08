import { isAdminFieldLevel } from '@/access/is-admin'
import { isAdminOrSelf } from '@/access/is-admin-or-self'
import { WelcomeEmailTemplate } from '@/email/welcome-template'
import { SubscriptionActivatedTemplate } from '@/email/subscription-activated-template'
import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req, operation }) => {
        if (operation === 'create') {
          req.payload.sendEmail({
            to: doc.email,
            subject: 'Welcome to GimmeDoc',
            html: WelcomeEmailTemplate({ user: doc }),
          })
        } else if (
          operation === 'update' &&
          doc.subscription?.status === 'active' &&
          previousDoc.subscription?.status !== 'active'
        ) {
          req.payload.sendEmail({
            to: doc.email,
            subject: 'Your GimmeDoc Pro Subscription is Active! 🎉',
            html: SubscriptionActivatedTemplate({ user: doc }),
          })
        }
      },
    ],
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
      access: {
        update: isAdminFieldLevel,
      },
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
      access: {
        update: isAdminFieldLevel,
      },
    },
    {
      name: 'subscriptionLimit',
      type: 'number',
      access: {
        update: isAdminFieldLevel,
      },
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
            { label: 'Inactive', value: 'inactive' },
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
          name: 'appsumoLicenseKey',
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
