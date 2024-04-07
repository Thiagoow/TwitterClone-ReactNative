import { Suspense } from 'react'
import AuthDataSource from '#dataSource/AuthDataSource'
import AuthUseCase from '#useCases/AuthUseCase'
import LoginScreen from '#screens/LoginScreen'

function LoginFactory() {
  const dataSource = new AuthDataSource()

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginScreen useCase={AuthUseCase(dataSource)} />
    </Suspense>
  )
}

export default LoginFactory
