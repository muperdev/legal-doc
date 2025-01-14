import { cookies } from 'next/headers'
import { User } from '../payload-types'

export async function currentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')

  if (!token) return null

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    const { user } = await response.json()

    return user as User
  } catch (err) {
    console.error(err)
    return null
  }
}
