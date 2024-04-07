export type Step = 'signUp' | 'code' | 'password'

export type NavigationRouteParams = {
  Registration: { step: Step }
}
