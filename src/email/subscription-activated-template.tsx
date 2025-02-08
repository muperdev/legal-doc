import { User } from '@/payload-types'

interface SubscriptionActivatedEmailProps {
  user: User
}

export const SubscriptionActivatedTemplate = ({ user }: SubscriptionActivatedEmailProps) => {
  const siteUrl = 'https://gimmedoc.com'

  const planName =
    user.subscription?.plan === 'pro_monthly'
      ? 'Pro Monthly'
      : user.subscription?.plan === 'pro_yearly'
        ? 'Pro Yearly'
        : user.subscription?.plan === 'appsumo_lifetime'
          ? 'AppSumo Lifetime'
          : 'Pro'

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Subscription Activated - GimmeDoc</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            background-color: #f4f4f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          .email-body {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            padding: 40px;
          }
          .logo {
            text-align: center;
            margin-bottom: 32px;
            background-color: #18181b;
            padding: 24px;
            border-radius: 8px;
            margin: -40px -40px 32px -40px;
          }
          .logo img {
            height: 40px;
            width: auto;
          }
          h1 {
            color: #18181b;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 24px;
            text-align: center;
          }
          p {
            color: #3f3f46;
            font-size: 16px;
            margin: 16px 0;
          }
          .button {
            display: inline-block;
            background-color: #FBB03B;
            color: #18181b !important;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin: 24px 0;
            text-align: center;
            transition: all 0.2s ease;
          }
          .button:hover {
            background-color: #F59E0B;
            transform: translateY(-1px);
            color: #18181b !important;
            text-decoration: none;
          }
          .subscription-box {
            margin: 32px 0;
            padding: 24px;
            background-color: #fef3c7;
            border: 2px solid #FBB03B;
            border-radius: 6px;
            text-align: center;
          }
          .plan-name {
            font-size: 20px;
            font-weight: 600;
            color: #18181b;
            margin-bottom: 8px;
          }
          .features {
            margin: 32px 0;
            padding: 24px;
            background-color: #f8fafc;
            border-radius: 6px;
          }
          .feature {
            margin: 16px 0;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .footer {
            text-align: center;
            margin-top: 32px;
            padding-top: 32px;
            border-top: 1px solid #e4e4e7;
            color: #71717a;
            font-size: 14px;
          }
          .social-links {
            margin: 16px 0;
          }
          .social-links a {
            color: #18181b;
            text-decoration: none;
            margin: 0 8px;
            font-weight: 500;
          }
          .social-links a:hover {
            color: #FBB03B;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email-body">
            <div class="logo">
              <img src="${siteUrl}/logo.png" alt="GimmeDoc Logo" />
            </div>
            
            <h1>Your GimmeDoc Pro Subscription is Active! 🎉</h1>
            
            <p>Fantastic news, ${user.firstName}! Your subscription has been successfully activated. You now have full access to all GimmeDoc Pro features.</p>
            
            <div class="subscription-box">
              <div class="plan-name">${planName}</div>
              <p style="margin: 8px 0;">Your subscription is now active and ready to use</p>
            </div>

            <p>With your Pro subscription, you can now:</p>

            <div class="features">
              <div class="feature">✨ Create unlimited legal documents</div>
              <div class="feature">🚀 Access premium templates</div>
              <div class="feature">📊 Advanced document analytics</div>
              <div class="feature">🤝 Priority customer support</div>
            </div>

            <div style="text-align: center;">
              <a href="${siteUrl}/dashboard" class="button">Go to Dashboard →</a>
            </div>

            <p>Need help getting started with your Pro features? Our support team is here for you. Just reply to this email with any questions.</p>

            <div class="footer">
              <div>GimmeDoc - Professional Legal Documents Made Simple</div>
              <div class="social-links">
                <a href="https://instagram.com/gimmedocs" target="_blank" rel="noopener noreferrer">Instagram</a> • 
                <a href="https://x.com/gimmedoc" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
              </div>
              <div style="margin-top: 16px;">
                © ${new Date().getFullYear()} GimmeDoc. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}
