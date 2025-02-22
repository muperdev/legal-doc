# GimmeDoc 📄

GimmeDoc is a modern, user-friendly platform for creating, managing, and streamlining legal documents. Built with Next.js, PayloadCMS, and TypeScript, it offers a robust solution for legal document management.

![GimmeDoc Logo](public/logo.png)

## 🚀 Features

- **Document Creation & Management**

  - Create professional legal documents in minutes
  - Access documents anywhere, anytime
  - Bank-level security for sensitive data
  - Advanced document analytics

- **Subscription Plans**

  - Free tier with basic features
  - Pro Monthly & Yearly subscriptions
  - AppSumo Lifetime deal support
  - Premium templates and unlimited document creation

- **User Management**
  - Role-based access control (Admin/User)
  - Client management system
  - Document sharing and collaboration
  - Subscription management

## 🛠 Tech Stack

- **Frontend**

  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - Shadcn/UI Components
  - React Hook Form

- **Backend**

  - PayloadCMS
  - Node.js
  - MongoDB
  - TypeScript

- **Authentication & Payments**
  - JWT Authentication
  - Stripe Integration
  - AppSumo Integration

## 🏗 Project Structure

```
src/
├── access/              # Access control policies
├── collections/         # PayloadCMS collections
│   └── Users.ts        # User collection with subscription handling
├── components/
│   └── landing/        # Landing page components
├── email/              # Email templates
│   ├── welcome-template.tsx
│   └── subscription-activated-template.tsx
└── app/                # Next.js app directory
```

## 🚦 Getting Started

1. **Prerequisites**

   ```bash
   bun -v  # Ensure Bun is installed
   ```

2. **Installation**

   ```bash
   bun install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:

   ```
   PAYLOAD_PUBLIC_SITE_URL=
   MONGODB_URL=
   STRIPE_SECRET_KEY=
   STRIPE_WEBHOOK_SECRET=
   ```

4. **Development**

   ```bash
   bun dev
   ```

5. **Production Build**
   ```bash
   bun run build
   bun start
   ```

## 💳 Subscription Management

GimmeDoc offers multiple subscription tiers:

- **Free**: Basic document creation
- **Pro Monthly**: Full access with monthly billing
- **Pro Yearly**: Full access with yearly billing (discounted)
- **AppSumo Lifetime**: Special lifetime access deal

## 📧 Email Notifications

The system sends automated emails for:

- Welcome messages for new users
- Subscription activation confirmations
- Payment notifications
- Document updates

## 🔐 Security

- JWT-based authentication
- Role-based access control
- Secure document storage
- GDPR compliance
- Data encryption

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is proprietary and confidential. All rights reserved.

## 📞 Support

For support, email support@gimmedoc.com or create an issue in the repository.

---

Built with ❤️ by the GimmeDoc Team
