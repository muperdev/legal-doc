'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserCircle2, Users2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RoleSelectorProps {
  onSelect: (role: 'provider' | 'client') => void
  className?: string
}

export function RoleSelector({ onSelect, className }: RoleSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<'provider' | 'client' | null>(null)

  const handleSelect = (role: 'provider' | 'client') => {
    setSelectedRole(role)
    onSelect(role)
  }

  return (
    <div className={cn('w-full space-y-6', className)}>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Select Your Role</h2>
        <p className="text-sm text-gray-500">
          Are you the Service Provider or the Client in this agreement?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('provider')}
          className={cn(
            'relative p-6  border border-gray-100 bg-white hover:bg-gray-50 transition-colors',
            selectedRole === 'provider' && 'ring-2 ring-gray-900',
          )}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="p-3 rounded-full bg-gray-100">
              <UserCircle2 className="w-8 h-8 text-gray-900" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-gray-900">Service Provider</h3>
              <p className="text-sm text-gray-500 mt-1">I will be providing the service</p>
            </div>
          </div>
          {selectedRole === 'provider' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gray-900"
            />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('client')}
          className={cn(
            'relative p-6  border border-gray-100 bg-white hover:bg-gray-50 transition-colors',
            selectedRole === 'client' && 'ring-2 ring-gray-900',
          )}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="p-3 rounded-full bg-gray-100">
              <Users2 className="w-8 h-8 text-gray-900" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-gray-900">Client</h3>
              <p className="text-sm text-gray-500 mt-1">I will be receiving the service</p>
            </div>
          </div>
          {selectedRole === 'client' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gray-900"
            />
          )}
        </motion.button>
      </div>
    </div>
  )
}
