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
import Icon from 'react-native-vector-icons/FontAwesome6'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '#theme/colors'

type HeaderProps = {
  avatarUrl?: ImageSourcePropType
} & ViewProps

const Header = ({ avatarUrl, ...rest }: HeaderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  function toggleModal() {
    console.log('toggleModal')
  }

  function toggleDrawer() {
    navigation.dispatch(DrawerActions.toggleDrawer())
  }

  return useMemo(
    () => (
      <View style={styles.headerBackground} {...rest}>
        <StatusBar style="dark" />

        <TouchableOpacity
          onPress={toggleDrawer}
          style={styles.profileBtn}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          {avatarUrl ? (
            <Image source={avatarUrl} style={styles.profileBtn} />
          ) : (
            <MaterialCommunityIcon name="account-circle" size={40} color={colors.lightGreyColor} />
          )}
        </TouchableOpacity>

        <Icon name="twitter" size={25} color={colors.primaryColor} />

        <TouchableOpacity
          onPress={toggleModal}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <MaterialCommunityIcon
            name="clock-plus-outline"
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
    backgroundColor: colors.extraLightGreyColor,
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
