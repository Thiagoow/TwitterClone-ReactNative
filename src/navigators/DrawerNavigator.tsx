import { createDrawerNavigator } from '@react-navigation/drawer'
import TabNavigator from '#navigators/StackNavigator'
import SplashScreen from '#screens/SplashScreen'
import MainProvider from '#providers/MainProvider'
import MainProviderUseCase from '#useCases/MainProvider'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <MainProvider useCase={MainProviderUseCase()}>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="SplashScreen" component={SplashScreen} />
        <Drawer.Screen name="App" component={TabNavigator} />
      </Drawer.Navigator>
    </MainProvider>
  )
}

export default DrawerNavigator
