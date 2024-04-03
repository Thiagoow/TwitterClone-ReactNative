import React, { useMemo } from 'react'
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet } from 'react-native'
import { useMainProvider } from '#providers/MainProvider'
import { colors } from '#theme/colors'

type ButtonProps = {
  children: string | React.ReactNode
  marginTop?: number
} & TouchableOpacityProps

const Button = ({ children, marginTop, ...rest }: ButtonProps) => {
  const { isDark } = useMainProvider()

  return useMemo(() => {
    return (
      <TouchableOpacity
        {...{
          style: [styles.button, styles.primaryVariant, { marginTop }]
        }}
        {...rest}
      >
        {typeof children === 'string' ? (
          <Text style={[styles.buttonText, styles.primaryVariant]}>{children}</Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    )
  }, [isDark, children, marginTop, Object.keys(rest)])
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold'
  },
  primaryVariant: {
    color: colors.whiteColor,
    backgroundColor: colors.primaryColor
  }
})

export default Button
