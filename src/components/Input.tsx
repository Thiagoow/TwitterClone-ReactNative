import { useMemo } from 'react'
import { StyleSheet, View, Text, TextInput, TextInputProps } from 'react-native'
import { colors } from '#theme/colors'
import { useMainProvider } from '#providers/MainProvider'

type InputProps = {
  label?: string
  placeholder: string
} & TextInputProps

const Input = ({ label, placeholder, ...rest }: InputProps) => {
  const { isDark } = useMainProvider()

  return useMemo(
    () => (
      <View style={styles.container}>
        {label ? (
          <Text
            style={[
              styles.inputLabel,
              { color: isDark ? colors.extraLightGreyColor : colors.darkTxtColor }
            ]}
          >
            {label}
          </Text>
        ) : null}

        <TextInput
          {...{
            placeholder,
            placeholderTextColor: isDark ? colors.lightGreyColor : colors.greyColor,
            style: [styles.textInput, isDark ? styles.textInputDark : styles.textInputLight]
          }}
          {...rest}
        />
      </View>
    ),
    [label, placeholder, Object.keys(rest)]
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 8
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular'
  },
  textInput: {
    padding: 16,
    borderRadius: 10
  },
  textInputLight: {
    color: colors.darkTxtColor,
    backgroundColor: colors.extraLightGreyColor
  },
  textInputDark: {
    color: colors.extraLightGreyColor,
    backgroundColor: colors.lessDarkColor
  }
})

export default Input
