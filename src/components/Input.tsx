import { useMemo } from 'react'
import { StyleSheet, View, Text, TextInput, TextInputProps } from 'react-native'
import { colors } from '#theme/colors'
import { useMainProvider } from '#providers/MainProvider'
import { Controller } from 'react-hook-form'
import { UseControllerProps } from 'react-hook-form/dist/types'

type InputProps = {
  label?: string
  name: string
  placeholder: string
  rules?: UseControllerProps['rules']
  disabled?: UseControllerProps['disabled']
  control?: UseControllerProps['control']
} & TextInputProps

const Input = ({
  label,
  name,
  rules,
  disabled,
  placeholder,
  control,
  onChange,
  ...rest
}: InputProps) => {
  const { isDark } = useMainProvider()

  return useMemo(
    () => (
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
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
                value,
                onBlur,
                placeholder,
                editable: !disabled,
                onChangeText: onChange,
                selectTextOnFocus: !disabled,
                placeholderTextColor: isDark ? colors.greyColor : colors.lightGreyColor,
                style: [
                  styles.textInput,
                  { opacity: disabled ? 0.5 : 1 },
                  isDark ? styles.textInputDark : styles.textInputLight
                ],
                ...rest
              }}
            />

            {error ? <Text style={styles.errorMessage}>{error.message || 'Error'}</Text> : null}
          </View>
        )}
      />
    ),
    [label, name, placeholder, rules, disabled, onChange, control, Object.keys(rest)]
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
    backgroundColor: colors.lightestGrayColor
  },
  textInputDark: {
    color: colors.extraLightGreyColor,
    backgroundColor: colors.lessDarkColor
  },
  errorMessage: {
    marginTop: 2,
    fontSize: 12,
    color: colors.likeColor,
    fontFamily: 'Inter_400Regular'
  }
})

export default Input
