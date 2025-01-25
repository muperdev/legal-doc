'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

interface AnimatedButtonProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  fullWidth?: boolean
}

export function AnimatedButton({
  href,
  onClick,
  className,
  children,
  fullWidth = false,
  ...props
}: AnimatedButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'group relative inline-flex items-center justify-center gap-x-2 md:gap-x-4 text-sm md:text-base font-medium py-2 md:py-3 px-3 md:px-4 text-white border border-transparent overflow-hidden',
        "before:absolute before:inset-0 before:p-[2px] before:bg-gradient-to-r before:from-[#3b82f6] before:via-[#eab308] before:via-30% before:to-[#22c55e] before:rounded-md before:content-[''] before:animate-border-flow before:transition-all before:duration-500 before:ease-in-out",
        "after:absolute after:inset-[2px] after:bg-black after:rounded-[4px] after:content-[''] after:transition-all after:duration-500 after:ease-in-out",
        'hover:before:p-0 hover:before:animate-none',
        'hover:after:bg-gradient-to-r hover:after:from-black hover:after:to-transparent hover:after:opacity-0',
        'hover:before:scale-[1.01] hover:before:rotate-[1deg]',
        'transition-all duration-500 ease-in-out',
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-x-2 md:gap-x-4 transition-all duration-500 ease-in-out group-hover:text-black">
        {children}
      </span>
    </Link>
  )
}
