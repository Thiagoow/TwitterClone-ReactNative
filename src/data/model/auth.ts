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

export interface GetUserInfoResponse {
  user: User | null
  success: boolean
  message: string
}
