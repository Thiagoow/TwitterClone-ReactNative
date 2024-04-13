import { Suspense } from 'react'
import { useRoute } from '@react-navigation/native'
import AuthDataSource from '#dataSource/AuthDataSource'
import AuthUseCase from '#useCases/AuthUseCase'
import RegistrationScreen, { RegistrationRouteProp } from '#screens/RegistrationScreen'
import CustomHttpClient from '#http/customHttpClient'

function RegistrationFactory() {
  const route = useRoute<RegistrationRouteProp>()
  const dataSource = new AuthDataSource(new CustomHttpClient())

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <RegistrationScreen useCase={AuthUseCase(dataSource)} route={route} />
    </Suspense>
  )
}

export default RegistrationFactory
