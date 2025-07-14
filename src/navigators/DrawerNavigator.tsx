import { createDrawerNavigator } from '@react-navigation/drawer'
import MainProvider from '#providers/MainProvider'
import MainProviderUseCase from '#useCases/MainProvider'
import MainStackNavigator from '#navigators/StackNavigator'
import SplashScreen from '#screens/SplashScreen'
import LoginFactory from '#factories/LoginFactory'
import RegistrationFactory from '#factories/RegistrationFactory'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <MainProvider useCase={MainProviderUseCase()}>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="SplashScreen" component={SplashScreen} />
        <Drawer.Screen name="Login" component={LoginFactory} />
        <Drawer.Screen name="Registration" component={RegistrationFactory} />
        <Drawer.Screen name="App" component={MainStackNavigator} />
      </Drawer.Navigator>
    </MainProvider>
  )
}

export default DrawerNavigator
