import React, { useMemo } from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle
} from 'react-native'
import { useMainProvider } from '#providers/MainProvider'
import { colors } from '#theme/colors'
import Spinner from '#components/Spinner'

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'text'
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

  function getBtnVariant(): ViewStyle {
    switch (variant) {
      case 'primary':
        return { ...styles.btnStyles, backgroundColor: colors.primaryColor }
      case 'secondary':
        return {
          ...styles.btnStyles,
          backgroundColor: isDark ? colors.whiteColor : colors.lessDarkColor
        }
      default:
        return {}
    }
  }

  function getTextVariant(): TextStyle {
    switch (variant) {
      case 'primary':
        return { color: colors.whiteColor }
      case 'secondary':
        return { color: isDark ? colors.darkTxtColor : colors.extraLightGreyColor }
      case 'text':
        return { color: colors.primaryColor, textDecorationLine: 'underline' }
      default:
        return {}
    }
  }

  return useMemo(() => {
    return (
      <TouchableOpacity
        {...{
          activeOpacity: 0.6,
          disabled: isLoading || disabled,
          style: [getBtnVariant(), { marginTop }, { opacity: disabled ? 0.5 : 1 }]
        }}
        {...rest}
      >
        {typeof children === 'string' ? (
          <Text style={[styles.txtStyles, getTextVariant()]}>{children}</Text>
        ) : (
          children
        )}

        {isLoading ? <Spinner /> : null}
      </TouchableOpacity>
    )
  }, [isDark, variant, children, marginTop, isLoading, disabled, Object.keys(rest)])
}

const styles = StyleSheet.create({
  btnStyles: {
    padding: 16,
    columnGap: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  txtStyles: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold'
  }
})

export default Button
