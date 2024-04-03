import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { colors } from '#theme/colors'

export default function SplashScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  function goToApp() {
    navigation.navigate('App')
  }

  setTimeout(goToApp, 2000)

  return (
    <View style={styles.container}>
      <Icon name="twitter" size={63} color={colors.whiteColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryColor
  }
})
