import { Suspense } from 'react'
import AuthDataSource from '#dataSource/AuthDataSource'
import AuthUseCase from '#useCases/AuthUseCase'
import RegistrationScreen, { RegistrationRouteProp } from '#screens/RegistrationScreen'
import { useRoute } from '@react-navigation/native'

function RegistrationFactory() {
  const route = useRoute<RegistrationRouteProp>()
  const dataSource = new AuthDataSource()

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <RegistrationScreen useCase={AuthUseCase(dataSource)} route={route} />
    </Suspense>
  )
}

export default RegistrationFactory
