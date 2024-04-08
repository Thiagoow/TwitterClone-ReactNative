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
  const { logIn, loading, goToRegistration } = props.useCase

  return (
    <AppLayout fullHeight>
      <View style={styles.container}>
        <Text
          style={[styles.title, { color: isDark ? colors.lightestGrayColor : colors.darkTxtColor }]}
        >
          Log in to your Account
        </Text>

        <View
          style={[
            styles.logoIcon,
            { backgroundColor: isDark ? colors.lessDarkColor : colors.extraLightGreyColor }
          ]}
        >
          <Icon name="twitter" size={92} color={colors.primaryColor} />
        </View>

        <View>
          <View style={[styles.inputsContainer, styles.horizontalPadding]}>
            <Input name="email" control={control} label="Email" placeholder="yourname@email.com" />

            <Input
              name="password"
              control={control}
              label="Password"
              placeholder="**************"
              secureTextEntry
            />
          </View>

          <View style={[styles.btnsContainer, styles.horizontalPadding]}>
            <Button
              disabled={!formState.isValid || !formState.isDirty}
              isLoading={loading}
              onPress={handleSubmit((values) =>
                logIn({ email: values.email, password: values.password })
              )}
            >
              Login
            </Button>

            <Button variant="secondary" onPress={() => goToRegistration()}>
              Sign Up
            </Button>

            <Button variant="text" onPress={() => goToRegistration(true)}>
              Forgot my Password
            </Button>
          </View>
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
    width: 156,
    height: 156,
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
  horizontalPadding: {
    paddingHorizontal: 32
  },
  inputsContainer: {
    rowGap: 20,
    marginBottom: 30
  },
  btnsContainer: {
    rowGap: 20,
    marginBottom: 22
  }
})
