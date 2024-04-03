import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { colors } from '#theme/colors'
import { useMainProvider } from '#providers/MainProvider'

export default function SplashScreen() {
  const { user } = useMainProvider()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigation.navigate('App')
      } else {
        navigation.navigate('Login')
      }
    }, 2000)
  }, [])

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
