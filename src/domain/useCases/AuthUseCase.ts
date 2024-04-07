import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LogInParams } from '#model/auth'
import AuthDataSource from '#dataSource/AuthDataSource'
import { useMainProvider } from '#providers/MainProvider'

export interface AuthUseCaseType {
  loading: boolean
  logIn: (parameters: LogInParams) => void
  getUserInfo: () => void
}

export default function AuthUseCase(source: AuthDataSource): AuthUseCaseType {
  const { user, setUser } = useMainProvider()
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  async function logIn(parameters: LogInParams) {
    setLoading(true)
    const { success, message, token } = await source.logIn(parameters)

    if (!success) {
      setLoading(false)
      console.error(message)
      return
    }

    setLoading(false)
    setUser(user ? { ...user, token } : { token })
    navigation.navigate('App')
  }

  async function getUserInfo() {
    setLoading(true)
    const { success, message, user } = await source.GetUserInfo()

    if (!success) {
      setLoading(false)
      console.error(message)
      return
    }

    setUser(user)
    setLoading(false)
  }

  return {
    loading,
    logIn,
    getUserInfo
  }
}
