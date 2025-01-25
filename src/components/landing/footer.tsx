import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin, Youtube, X, XCircleIcon } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-400">© 2025 GimmeDoc. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-sm text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="text-sm text-gray-400 hover:text-white">
              Refund Policy
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="https://instagram.com/gimmedocs"
              className="text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://x.com/gimmedoc"
              className="text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/xicon.png" alt="X" width={20} height={20} />
            </Link>
            
            <Link
              href="https://youtube.com/gimmedoc"
              className="text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
