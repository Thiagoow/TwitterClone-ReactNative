import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LogInParams, SignUpParams, UpdateUserParams, ValidateCodeParams } from '#model/auth'
import AuthDataSource from '#dataSource/AuthDataSource'
import { useMainProvider } from '#providers/MainProvider'

export interface AuthUseCaseType {
  loading: boolean
  goToRegistration: (resetPass?: boolean) => void
  logIn: (parameters: LogInParams) => void
  signUp: (resetPass: boolean, parameters: SignUpParams) => void
  updateUser: (resetPass: boolean, parameters: UpdateUserParams) => void
  validateCode: (resetPass: boolean, parameters: ValidateCodeParams) => void
}

export default function AuthUseCase(source: AuthDataSource): AuthUseCaseType {
  const { user, setUser } = useMainProvider()
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  function goToRegistration(resetPass?: boolean) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Registration', params: resetPass ? { step: 'forgotPassword' } : {} }]
    })
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
    navigation.reset({ index: 0, routes: [{ name: 'App' }] })
  }

  async function signUp(resetPass: boolean, parameters: SignUpParams) {
    setLoading(true)
    const { success, message } = await source.signUp(resetPass, parameters)

    if (!success) {
      setLoading(false)
      console.error(message)
      return
    }

    setLoading(false)
    if (resetPass) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Registration', params: { step: 'passCode' } }]
      })
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Registration', params: { step: 'code' } }]
      })
    }
  }

  async function validateCode(resetPass: boolean, parameters: ValidateCodeParams) {
    setLoading(true)
    const { success, message } = await source.validateCode(resetPass, parameters)

    if (!success) {
      setLoading(false)
      console.error(message)
      return
    }

    setLoading(false)
    if (resetPass) {
      navigation.navigate('Registration', { step: 'resetPassword' })
    } else {
      navigation.navigate('Registration', { step: 'password' })
    }
  }

  async function updateUser(resetPass: boolean, parameters: UpdateUserParams) {
    setLoading(true)
    const { success, message } = await source.updateUser(resetPass, parameters)

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
