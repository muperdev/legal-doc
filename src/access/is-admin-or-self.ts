import { Access, FieldAccess } from 'payload'
import type { User } from '../payload-types'

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user.role === 'admin') {
      return true
    }

    // If any other type of user, only provide access to themselves
    return {
      id: {
        equals: user.id,
      },
    }
  }

  // Reject everyone else
  return false
}

export const isAdminOrSelfFieldLevel: FieldAccess<{ id: string }, User> = ({
  req: { user },
  id,
}) => {
  // Return true or false based on if the user has an admin role
  if (user?.role === 'admin') return true
  if (user?.id === id) return true
  return false
}