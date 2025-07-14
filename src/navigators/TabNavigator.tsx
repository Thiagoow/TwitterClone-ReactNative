import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome6 } from '@expo/vector-icons'
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
            <FontAwesome6 name="house" size={iconsSize} solid={focused} color={getIconColor(focused)} />
          )
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <FontAwesome6
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
            <FontAwesome6 name="bell" size={iconsSize} solid={focused} color={getIconColor(focused)} />
          )
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <FontAwesome6 name="user" size={iconsSize} solid={focused} color={getIconColor(focused)} />
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
