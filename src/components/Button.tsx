import React, { useMemo } from 'react'
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet } from 'react-native'
import { useMainProvider } from '#providers/MainProvider'
import { colors } from '#theme/colors'
import Spinner from '#components/Spinner'

type ButtonProps = {
  variant?: 'primary' | 'secondary'
  children: string | React.ReactNode
  marginTop?: number
  isLoading?: boolean
} & TouchableOpacityProps

const Button = ({
  variant = 'primary',
  children,
  marginTop,
  isLoading = false,
  disabled,
  ...rest
}: ButtonProps) => {
  const { isDark } = useMainProvider()

  function getVariantStyle() {
    switch (variant) {
      case 'primary':
        return styles.primaryVariant
      case 'secondary':
        return styles.secondaryVariant
      default:
        return styles.primaryVariant
    }
  }

  return useMemo(() => {
    return (
      <TouchableOpacity
        {...{
          disabled: isLoading || disabled,
          style: [styles.button, getVariantStyle(), { marginTop }, { opacity: disabled ? 0.5 : 1 }]
        }}
        {...rest}
      >
        {typeof children === 'string' ? (
          <Text style={[styles.buttonText, getVariantStyle()]}>{children}</Text>
        ) : (
          children
        )}

        {isLoading ? <Spinner /> : null}
      </TouchableOpacity>
    )
  }, [isDark, variant, children, marginTop, isLoading, disabled, variant, Object.keys(rest)])
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
  },
  secondaryVariant: {
    color: colors.darkTxtColor,
    backgroundColor: colors.whiteColor
  }
})

export default Button
