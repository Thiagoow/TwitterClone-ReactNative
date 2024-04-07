import { useState, useEffect } from 'react'
import { User } from '#model/user'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

  async function loadUser() {
    try {
      const storedUser = await AsyncStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error('Error loading user from AsyncStorage:', error)
    }
  }

  async function saveUser(user: User) {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      console.error('Error saving user to AsyncStorage:', error)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return {
    user,
    setUser: async (user: User) => {
      setUser(user)
      await saveUser(user)
    },
    isDark,
    toggleDark
  }
}

export default MainProviderUseCase
