import { createDrawerNavigator } from '@react-navigation/drawer'
import TabNavigator from '#navigators/StackNavigator'
import SplashScreen from '#screens/SplashScreen'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="SplashScreen" component={SplashScreen} />
      <Drawer.Screen name="App" component={TabNavigator} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
