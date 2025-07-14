import { useEffect, useMemo, useRef } from 'react'
import { StyleSheet, Animated, ViewProps, Easing } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'
import { colors } from '#theme/colors'

type SpinnerProps = {
  size?: number
  duration?: number
} & ViewProps

const Spinner = ({ size = 16, duration = 800, ...rest }: SpinnerProps) => {
  const spinValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration,
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
        <FontAwesome6 {...{ name: 'spinner', size, color: colors.lightestGrayColor }} />
      </Animated.View>
    ),
    [spin, size, duration, rest]
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
