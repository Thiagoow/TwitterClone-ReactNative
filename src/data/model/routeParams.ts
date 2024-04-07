export type Step = 'signUp' | 'code' | 'password' | 'resetPassword'

export type NavigationRouteParams = {
  Registration: { step: Step }
}
