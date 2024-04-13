import { useMainProvider } from '#providers/MainProvider'

export function getUserToken(): string | null {
  const { user } = useMainProvider()
  return user ? user.token : null
}
