'use client'

import { LogOut } from 'lucide-react'

export function UserProfile() {
  const handleLogout = () => {
    // Add logout logic here
  }

  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">TC</span>
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">Tom Cook</p>
          <button
            className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
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
