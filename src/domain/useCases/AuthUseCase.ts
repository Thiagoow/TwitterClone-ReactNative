import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LogInParams, SignUpParams, UpdateUserParams, ValidateCodeParams } from '#model/auth'
import AuthDataSource from '#dataSource/AuthDataSource'
import { useMainProvider } from '#providers/MainProvider'

export interface AuthUseCaseType {
  loading: boolean
  goToRegistration: () => void
  logIn: (parameters: LogInParams) => void
  signUp: (parameters: SignUpParams) => void
  updateUser: (parameters: UpdateUserParams) => void
  validateCode: (parameters: ValidateCodeParams) => void
}

export default function AuthUseCase(source: AuthDataSource): AuthUseCaseType {
  const { user, setUser } = useMainProvider()
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  function goToRegistration() {
    navigation.reset({ index: 0, routes: [{ name: 'Registration' }] })
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

  async function signUp(parameters: SignUpParams) {
    setLoading(true)
    const { success, message } = await source.signUp(parameters)

    if (!success) {
      setLoading(false)
      console.error(message)
      return
    }

    setLoading(false)
    navigation.navigate('Registration', { step: 'code' })
  }

  async function validateCode(parameters: ValidateCodeParams) {
    setLoading(true)
    const { success, message } = await source.validateCode(parameters)

    if (!success) {
      setLoading(false)
      console.error(message)
      return
    }

    setLoading(false)
    navigation.navigate('Registration', { step: 'password' })
  }

  async function updateUser(parameters: UpdateUserParams) {
    setLoading(true)
    const { success, message } = await source.updateUser(parameters)

    if (!success) {
      setLoading(false)
      console.error(message)
      return
    }

    setLoading(false)
    navigation.navigate('Login')
  }

  return {
    loading,
    goToRegistration,
    logIn,
    signUp,
    updateUser,
    validateCode
  }
}
