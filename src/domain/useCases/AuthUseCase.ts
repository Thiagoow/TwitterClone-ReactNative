import { useState } from 'react'
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
      console.log(message, token)
      return
    }

    setLoading(false)
    setUser({ ...user, token })
  }

  return {
    loading,
    getUserInfo,
    logIn
  }
}
