import React, { useMemo } from 'react'
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet } from 'react-native'
import { useMainProvider } from '#providers/MainProvider'
import { colors } from '#theme/colors'
import Spinner from '#components/Spinner'

type ButtonProps = {
  children: string | React.ReactNode
  marginTop?: number
  isLoading?: boolean
} & TouchableOpacityProps

const Button = ({ children, marginTop, isLoading = false, disabled, ...rest }: ButtonProps) => {
  const { isDark } = useMainProvider()

  return useMemo(() => {
    return (
      <TouchableOpacity
        {...{
          disabled: isLoading || disabled,
          style: [
            styles.button,
            styles.primaryVariant,
            { marginTop },
            { opacity: disabled ? 0.5 : 1 }
          ]
        }}
        {...rest}
      >
        {typeof children === 'string' ? (
          <Text style={[styles.buttonText, styles.primaryVariant]}>{children}</Text>
        ) : (
          children
        )}

        {isLoading ? <Spinner /> : null}
      </TouchableOpacity>
    )
  }, [isDark, children, marginTop, isLoading, disabled, Object.keys(rest)])
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    columnGap: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
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
