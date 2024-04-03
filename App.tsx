import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from '#navigators/DrawerNavigator'
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold
} from '@expo-google-fonts/inter'

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  )
}
