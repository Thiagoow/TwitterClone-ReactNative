import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { colors } from '#theme/colors'
import { useMainProvider } from '#providers/MainProvider'
import Spinner from '#components/Spinner'

export default function SplashScreen() {
  const { user } = useMainProvider()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  useEffect(() => {
    if (user) {
      navigation.navigate('App')
    } else {
      navigation.navigate('Login')
    }
  }, [user])

  return (
    <View style={styles.container}>
      <Icon name="twitter" size={63} color={colors.whiteColor} />

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
