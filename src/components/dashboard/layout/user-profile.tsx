'use client'

import { LogOut } from 'lucide-react'

const handleLogout = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    window.location.replace('/login')
    return true
  } catch (error) {
    console.error('Logout failed', error)
    return false
  }
}
export function UserProfile() {
  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">TC</span>
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-white">Tom Cook</p>
          <button
            className="text-xs text-gray-500 hover:text-white flex items-center"
            onClick={handleLogout}
          >
            <LogOut className="mr-1 h-3 w-3" />
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}
