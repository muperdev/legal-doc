import './globals.css'
import { Black_Han_Sans, Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { CSPostHogProvider } from './provider'
import { ToastProvider } from '@/components/providers/toast-provider'
import Script from 'next/script'

const blackHanSans = Black_Han_Sans({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  variable: '--font-black-han-sans',
})
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  variable: '--font-open-sans',
})
export const metadata = {
  title: 'Gimme Doc - Create Legal Docs in Seconds',
  description:
    'Generate professional legal documents for startups, freelancers, and entrepreneurs.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body
          className={`${blackHanSans.variable} ${openSans.variable} font-black-han-sans bg-black text-neutral-400`}
        >
          {children}
          <Analytics />
          <ToastProvider />

          {/* Twitter conversion tracking */}
          <Script
            id="twitter-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
                },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
                a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
                twq('config','q4kzc');
              `,
            }}
          />
        </body>
      </CSPostHogProvider>
    </html>
  )
}
