export type Step = 'signUp' | 'forgotPassword' | 'code' | 'passCode' | 'password' | 'resetPassword'

export type NavigationRouteParams = {
  Registration: { step: Step }
}
