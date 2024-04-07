import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { colors } from '#theme/colors'
import Input from '#components/Input'
import AppLayout from '#components/AppLayout'
import Button from '#components/Button'
import { AuthUseCaseType } from '#useCases/AuthUseCase'
import { useMainProvider } from '#providers/MainProvider'
import { useForm } from 'react-hook-form'

interface LoginScreenDependencies {
  useCase: AuthUseCaseType
}

export default function LoginScreen(props: LoginScreenDependencies) {
  const { isDark } = useMainProvider()
  const { control, formState, handleSubmit } = useForm({})
  const { logIn, loading } = props.useCase

  return (
    <AppLayout fullHeight>
      <View style={styles.container}>
        <Text
          style={[styles.title, { color: isDark ? colors.lightestGrayColor : colors.darkTxtColor }]}
        >
          Log in to your Account
        </Text>

        <View>
          <View
            style={[
              styles.logoIcon,
              { backgroundColor: isDark ? colors.lessDarkColor : colors.extraLightGreyColor }
            ]}
          >
            <Icon name="twitter" size={92} color={colors.primaryColor} />
          </View>

          <Text
            style={[styles.subtitle, { color: isDark ? colors.lightGreyColor : colors.greyColor }]}
          >
            And start tweeting now
          </Text>
        </View>

        <View style={styles.inputsContainer}>
          <Input name="email" control={control} label="Email" placeholder="yourname@email.com" />
          <Input
            name="password"
            control={control}
            label="Password"
            placeholder="**************"
            secureTextEntry
          />

          <Button
            disabled={!formState.isValid || !formState.isDirty}
            isLoading={loading}
            onPress={handleSubmit((values) =>
              logIn({ email: values.email, password: values.password })
            )}
            marginTop={30}
          >
            Login
          </Button>
        </View>
      </View>
    </AppLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  logoIcon: {
    width: 176,
    height: 176,
    borderRadius: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    marginTop: 50,
    alignSelf: 'center',
    fontFamily: 'Inter_600SemiBold'
  },
  subtitle: {
    fontSize: 14,
    marginTop: 25,
    alignSelf: 'center',
    fontFamily: 'Inter_400Regular'
  },
  inputsContainer: {
    rowGap: 20,
    marginBottom: 42,
    paddingHorizontal: 32
  }
})
