import './globals.css'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' })

export const metadata = {
  title: 'MateDocs - Create Legal Docs in Minutes',
  description:
    'Generate professional legal documents for startups, freelancers, and entrepreneurs.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${openSans.variable} font-sans bg-black text-neutral-400`}
      >
        {children}
      </body>
    </html>
  )
}
