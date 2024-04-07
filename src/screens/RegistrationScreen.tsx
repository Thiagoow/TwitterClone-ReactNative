import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { colors } from '#theme/colors'
import Input from '#components/Input'
import AppLayout from '#components/AppLayout'
import Button from '#components/Button'
import { AuthUseCaseType } from '#useCases/AuthUseCase'
import { useMainProvider } from '#providers/MainProvider'
import { useForm } from 'react-hook-form'
import { RouteProp } from '@react-navigation/native'
import { NavigationRouteParams, Step } from '#model/routeParams'

export type RegistrationRouteProp = RouteProp<NavigationRouteParams, 'Registration'>

interface RegistrationScreenDependencies {
  useCase: AuthUseCaseType
  route?: RegistrationRouteProp
}

export default function RegistrationScreen({ route, useCase }: RegistrationScreenDependencies) {
  const { step } = route?.params || { step: 'signUp' }
  const { isDark } = useMainProvider()
  const { control, formState, handleSubmit } = useForm({})
  const { signUp, validateCode, updateUser, loading } = useCase

  function getTitle(step: Step) {
    switch (step) {
      case 'signUp':
        return 'Create a new Account'
      case 'code':
        return 'Enter Confirmation Code'
      case 'password':
        return 'Set Your Password'
      default:
        return 'Create a new Account'
    }
  }

  function getSubtitle(step: Step) {
    switch (step) {
      case 'signUp':
      default:
        return 'Please type your e-mail and we’ll send you a code'
      case 'code':
        return 'Please type the confirmation code to make your sign up'
      case 'password':
        return 'Set a password for your account'
    }
  }

  function getIconName(step: Step) {
    switch (step) {
      case 'signUp':
      default:
        return 'at'
      case 'code':
        return 'circle-user'
      case 'password':
        return 'lock'
    }
  }

  function onSubmit(values: any, step: Step) {
    switch (step) {
      case 'signUp':
      default:
        signUp({ email: values.email })
        break
      case 'code':
        validateCode({ code: values.code })
        break
      case 'password':
        updateUser({
          password: values.password,
          passwordConfirmation: values.passwordConfirmation
        })
        break
    }
  }

  return (
    <AppLayout fullHeight>
      <View style={styles.container}>
        <Text
          style={[styles.title, { color: isDark ? colors.lightestGrayColor : colors.darkTxtColor }]}
        >
          {getTitle(step)}
        </Text>

        <View>
          <View
            style={[
              styles.logoIcon,
              { backgroundColor: isDark ? colors.lessDarkColor : colors.extraLightGreyColor }
            ]}
          >
            <Icon
              name={getIconName(step)}
              solid={step === 'password'}
              size={92}
              color={colors.primaryColor}
            />
          </View>

          <Text
            style={[styles.subtitle, { color: isDark ? colors.lightGreyColor : colors.greyColor }]}
          >
            {getSubtitle(step)}
          </Text>
        </View>

        <View style={styles.inputsContainer}>
          {step === 'password' ? (
            <>
              <Input
                name="password"
                control={control}
                label="Password"
                placeholder="**************"
                secureTextEntry
              />
              <Input
                name="passwordConfirmation"
                control={control}
                label="Confirm Password"
                placeholder="**************"
                secureTextEntry
              />
            </>
          ) : (
            <Input
              name={step === 'code' ? 'code' : 'email'}
              control={control}
              label={step === 'code' ? 'Confirmation Code' : 'Email'}
              placeholder={step === 'code' ? '123456' : 'yourname@email.com'}
            />
          )}

          <Button
            disabled={!formState.isValid || !formState.isDirty}
            isLoading={loading}
            onPress={handleSubmit((values) => onSubmit(values, step))}
            marginTop={30}
          >
            {step === 'password' ? 'Sign Up' : 'Send'}
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
    maxWidth: 200,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Inter_400Regular'
  },
  inputsContainer: {
    rowGap: 20,
    marginBottom: 42,
    paddingHorizontal: 32
  }
})
