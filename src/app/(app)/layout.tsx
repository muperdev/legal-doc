import './globals.css'
import { Black_Han_Sans, Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { CSPostHogProvider } from './provider'

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
        </body>
      </CSPostHogProvider>
    </html>
  )
}
