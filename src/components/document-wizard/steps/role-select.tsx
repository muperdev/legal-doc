import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserCircle2, Users2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type UserRole = 'client' | 'provider'

interface RoleSelectProps {
  selectedRole: UserRole | null
  setSelectedRole: (role: UserRole) => void
  onNext: () => void
  error?: string | null
}

export function RoleSelect({ selectedRole, setSelectedRole, onNext, error }: RoleSelectProps) {
  return (
    <Card className="bg-black border-neutral-800/50">
      <CardHeader>
        <CardTitle className="text-white">Select Your Role</CardTitle>
        <CardDescription className="text-gray-500">
          Are you the Service Provider or the Client in this agreement?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedRole('provider')}
            className={cn(
              'relative p-6 rounded-lg border border-neutral-800/50 bg-black transition-colors',
              selectedRole === 'provider' && 'ring-2 ring-white',
            )}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 rounded-full bg-gray-100">
                <UserCircle2 className="w-8 h-8 text-gray-900" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-white">Service Provider</h3>
                <p className="text-sm text-gray-500 mt-1">I will be providing the service</p>
              </div>
            </div>
            {selectedRole === 'provider' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 w-4 h-4 rounded-full bg-white"
              />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedRole('client')}
            className={cn(
              'relative p-6 rounded-lg border border-neutral-800/50 bg-black transition-colors',
              selectedRole === 'client' && 'ring-2 ring-white',
            )}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 rounded-full bg-gray-100">
                <Users2 className="w-8 h-8 text-gray-900" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-white">Client</h3>
                <p className="text-sm text-gray-500 mt-1">I will be receiving the service</p>
              </div>
            </div>
            {selectedRole === 'client' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 w-4 h-4 rounded-full bg-white"
              />
            )}
          </motion.button>
        </div>

        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

        <div className="flex justify-end mt-6">
          <Button
            onClick={onNext}
            disabled={!selectedRole}
            variant="default"
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
