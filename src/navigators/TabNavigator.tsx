import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { colors } from '#theme/colors'
import Header from '#components/Header'
import HomeScreen from '#screens/HomeScreen'
import SearchScreen from '#screens/SearchScreen'
import NotificationsScreen from '#screens/NotificationsScreen'
import ProfileScreen from '#screens/ProfileScreen'

const Tab = createBottomTabNavigator()
const iconsSize = 25

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        header: () => <Header />,
        tabBarStyle: styles.tabBarStyle
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <Icon
              name="house"
              size={iconsSize}
              solid={focused}
              color={focused ? colors.greyColor : colors.lightGreyColor}
            />
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
              color={focused ? colors.greyColor : colors.lightGreyColor}
            />
          )
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <Icon
              name="bell"
              size={iconsSize}
              solid={focused}
              color={focused ? colors.greyColor : colors.lightGreyColor}
            />
          )
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <Icon
              name="user"
              size={iconsSize}
              solid={focused}
              color={focused ? colors.greyColor : colors.lightGreyColor}
            />
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
    backgroundColor: colors.whiteColor,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent'
  }
})

export default TabNavigator
