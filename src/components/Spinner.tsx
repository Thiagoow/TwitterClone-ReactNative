import { useEffect, useMemo, useRef } from 'react'
import { StyleSheet, Animated, ViewProps, Easing } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { colors } from '#theme/colors'

type SpinnerProps = {
  size?: number
} & ViewProps

const Spinner = ({ size = 16, ...rest }: SpinnerProps) => {
  const spinValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start()
  }, [])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return useMemo(
    () => (
      <Animated.View style={[styles.container, { transform: [{ rotate: spin }] }]}>
        <Icon {...{ name: 'spinner', size, color: colors.lightestGrayColor }} />
      </Animated.View>
    ),
    [size, rest, spin]
  )
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Spinner
