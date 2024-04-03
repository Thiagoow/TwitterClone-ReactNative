import { useState } from 'react'
import { User } from '#model/user'
import { useColorScheme } from 'react-native'

export interface MainProviderUseCase {
  user: User | null
  setUser: (user: User) => void
  isDark: boolean
  toggleDark: () => void
}

function MainProviderUseCase(): MainProviderUseCase {
  const colorScheme = useColorScheme()
  const [user, setUser] = useState<MainProviderUseCase['user']>(null)
  const [isDark, setIsDark] = useState(colorScheme === 'dark')

  function toggleDark() {
    setIsDark(!isDark)
  }

  return {
    user,
    setUser,
    isDark,
    toggleDark
  }
}

export default MainProviderUseCase
