import { User } from '#model/user'

export interface LogInParams {
  email: User['email']
  password: string
}

export interface LogInResponse {
  token?: User['token']
  expiresAt?: User['tokenExpiresAt']
  success: boolean
  message: string
}

export interface SignUpParams {
  email: User['email']
}

export interface SignUpResponse {
  success: boolean
  message: string
}

export interface ValidateCodeParams {
  key: string
}

export interface ValidateCodeResponse {
  user: User | null
  success: boolean
  message: string
}

export interface UpdateUserParams {
  fullName?: User['fullName']
  key: ValidateCodeParams['key']
  password: string
  passwordConfirmation: string
}

export interface UpdateUserResponse {
  success: boolean
  message: string
}
