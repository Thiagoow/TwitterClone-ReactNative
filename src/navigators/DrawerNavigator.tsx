import { createDrawerNavigator } from '@react-navigation/drawer'
import MainProvider from '#providers/MainProvider'
import MainProviderUseCase from '#useCases/MainProvider'
import TabNavigator from '#navigators/StackNavigator'
import SplashScreen from '#screens/SplashScreen'
import LoginScreen from '#screens/LoginScreen'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <MainProvider useCase={MainProviderUseCase()}>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="SplashScreen" component={SplashScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="App" component={TabNavigator} />
      </Drawer.Navigator>
    </MainProvider>
  )
}

export default DrawerNavigator
