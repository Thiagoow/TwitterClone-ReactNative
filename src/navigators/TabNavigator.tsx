import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { colors } from '#theme/colors'
import Header from '#components/Header'
import HomeScreen from '#screens/HomeScreen'
import SearchScreen from '#screens/SearchScreen'
import NotificationsScreen from '#screens/NotificationsScreen'
import ProfileScreen from '#screens/ProfileScreen'
import { useMainProvider } from '#providers/MainProvider'

const Tab = createBottomTabNavigator()
const iconsSize = 25

const TabNavigator = () => {
  const { isDark } = useMainProvider()

  function getIconColor(focused: boolean) {
    if (focused) {
      return isDark ? colors.lightGreyColor : colors.greyColor
    }
    return isDark ? colors.greyColor : colors.lightGreyColor
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        header: () => <Header />,
        tabBarStyle: [
          styles.tabBarStyle,
          { backgroundColor: isDark ? colors.lessDarkColor : colors.lightestGrayColor }
        ]
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <Icon name="house" size={iconsSize} solid={focused} color={getIconColor(focused)} />
          )
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <Icon
              name="magnifying-glass"
              size={iconsSize}
              solid={focused}
              color={getIconColor(focused)}
            />
          )
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <Icon name="bell" size={iconsSize} solid={focused} color={getIconColor(focused)} />
          )
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <Icon name="user" size={iconsSize} solid={focused} color={getIconColor(focused)} />
          )
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 58,
    position: 'relative',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent'
  }
})

export default TabNavigator
