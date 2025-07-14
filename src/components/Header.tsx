import { useMemo } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  View,
  ViewProps,
  TouchableOpacity,
  Image,
  ImageSourcePropType
} from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '#theme/colors'
import { useMainProvider } from '#providers/MainProvider'

type HeaderProps = {
  avatarUrl?: ImageSourcePropType
} & ViewProps

const Header = ({ avatarUrl, ...rest }: HeaderProps) => {
  const { isDark, toggleDark } = useMainProvider()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  function toggleDrawer() {
    navigation.dispatch(DrawerActions.toggleDrawer())
  }

  return useMemo(
    () => (
      <View
        style={[
          styles.headerBackground,
          { backgroundColor: isDark ? colors.lessDarkColor : colors.lightestGrayColor }
        ]}
        {...rest}
      >
        <StatusBar style={isDark ? 'light' : 'dark'} />

        <TouchableOpacity
          onPress={toggleDrawer}
          style={styles.profileBtn}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          {avatarUrl ? (
            <Image source={avatarUrl} style={styles.profileBtn} />
          ) : (
            <MaterialCommunityIcons name="account-circle" size={40} color={colors.lightGreyColor} />
          )}
        </TouchableOpacity>

        <FontAwesome6 name="twitter" size={25} color={colors.primaryColor} />

        <TouchableOpacity
          onPress={toggleDark}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <MaterialCommunityIcons
            name={isDark ? 'clock-plus' : 'clock-plus-outline'}
            size={34}
            color={colors.lightGreyColor}
          />
        </TouchableOpacity>
      </View>
    ),
    [avatarUrl, Object.keys(rest)]
  )
}

const styles = StyleSheet.create({
  headerBackground: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageUrl: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
})

export default Header
