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

type RegistrationRouteProp = RouteProp<NavigationRouteParams, 'Registration'>

interface RegistrationScreenDependencies {
  useCase: AuthUseCaseType
  route?: RegistrationRouteProp
}

export default function RegistrationScreen({ route, useCase }: RegistrationScreenDependencies) {
  const { step } = route?.params || { step: 'signUp' }
  const { isDark } = useMainProvider()
  const { control, formState, handleSubmit, resetField } = useForm({})
  const { signUp, validateCode, updateUser, loading } = useCase

  function getTitle(step: Step) {
    switch (step) {
      case 'forgotPassword':
      case 'passCode':
        return 'Reset your Password'
      case 'resetPassword':
        return 'Create a new Password'
      default:
        return 'Create a new Account'
    }
  }

  function getSubtitle(step: Step) {
    switch (step) {
      case 'code':
        return 'Please type the confirmation code to make your sign up'
      case 'resetPassword':
        return 'Set a password for your account'
      default:
        return 'Please type your e-mail and we’ll send you a code'
    }
  }

  function getIconName(step: Step) {
    if (step === 'password' || step === 'resetPassword') return 'lock'
    return step === 'code' || step === 'passCode' ? 'circle-user' : 'at'
  }

  function onSubmit(values: any, step: Step) {
    switch (step) {
      case 'signUp':
      case 'forgotPassword':
        signUp(step === 'signUp' || step === 'forgotPassword', { email: values.email })
        resetField('email')
        break
      case 'code':
        validateCode(false, { key: values.code })
        break
      case 'passCode':
        validateCode(true, { key: values.code })
        break
      case 'password':
        updateUser(false, {
          key: values.code,
          fullName: values.fullName,
          password: values.password,
          passwordConfirmation: values.passwordConfirmation
        })
      case 'resetPassword':
        updateUser(true, {
          key: values.code,
          password: values.password,
          passwordConfirmation: values.passwordConfirmation
        })
        break
      default:
        break
    }
  }

  function renderInputFields(step: Step) {
    if (step === 'password' || step === 'resetPassword') {
      return (
        <>
          {step === 'resetPassword' ? null : (
            <Input name="fullName" control={control} label="Full Name" placeholder="John Doe" />
          )}
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
      )
    }
    return (
      <Input
        name={step === 'code' || step === 'passCode' ? 'code' : 'email'}
        control={control}
        label={step === 'code' || step === 'passCode' ? 'Confirmation Code' : 'Email'}
        placeholder={step === 'code' || step === 'passCode' ? '123456' : 'yourname@email.com'}
      />
    )
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
              { backgroundColor: isDark ? colors.lessDarkColor : colors.lightestGrayColor }
            ]}
          >
            <Icon
              name={getIconName(step)}
              solid={step === 'password' || step === 'resetPassword'}
              size={92}
              color={colors.primaryColor}
            />
          </View>

          {step === 'password' ? null : (
            <Text
              style={[
                styles.subtitle,
                { color: isDark ? colors.lightGreyColor : colors.greyColor }
              ]}
            >
              {getSubtitle(step)}
            </Text>
          )}
        </View>

        <View style={styles.inputsContainer}>
          {renderInputFields(step)}

          <Button
            marginTop={30}
            isLoading={loading}
            disabled={!formState.isValid || !formState.isDirty}
            onPress={handleSubmit((values) => onSubmit(values, step))}
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
