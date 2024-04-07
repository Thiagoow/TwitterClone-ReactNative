import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LogInParams } from '#model/auth'
import AuthDataSource from '#dataSource/AuthDataSource'
import { useMainProvider } from '#providers/MainProvider'

export interface AuthUseCaseType {
  loading: boolean
  getUserInfo: () => void
  logIn: (parameters: LogInParams) => void
}

export default function AuthUseCase(source: AuthDataSource): AuthUseCaseType {
  const { user, setUser } = useMainProvider()
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  async function getUserInfo() {
    setLoading(true)
    const data = await source.GetUserInfo()

    if (!data) {
      setLoading(false)
      return
    }

    setUser(data)
    setLoading(false)
  }

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

  return {
    loading,
    getUserInfo,
    logIn
  }
}
