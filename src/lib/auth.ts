import { cookies } from 'next/headers'
import { User } from '../payload-types'

export async function currentUser({
  appliedToken,
}: {
  appliedToken?: string | undefined
} = {}): Promise<User | null> {
  let token: string | undefined = appliedToken
  if (!token) {
    const cookieStore = await cookies()
    token = cookieStore.get('payload-token')?.value ?? undefined
  }

  if (!token) return null

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const { user } = await response.json()

    return user as User
  } catch (err) {
    console.error(err)
    return null
  }
}
