import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FontAwesome6 } from '@expo/vector-icons'
import { colors } from '#theme/colors'
import { useMainProvider } from '#providers/MainProvider'
import Spinner from '#components/Spinner'

export default function SplashScreen() {
  const { user } = useMainProvider()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigation.reset({ index: 0, routes: [{ name: 'App' }] })
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
      }
    }, 500)
  }, [user])

  return (
    <View style={styles.container}>
      <FontAwesome6 name="twitter" size={63} color={colors.whiteColor} />

      <Spinner size={46} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryColor
  }
})
