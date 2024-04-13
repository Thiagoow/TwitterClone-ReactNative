import {
  LogInParams,
  LogInResponse,
  SignUpParams,
  SignUpResponse,
  UpdateUserParams,
  UpdateUserResponse,
  ValidateCodeParams,
  ValidateCodeResponse
} from '#model/auth'
import environment from '#config/enviroment'
import CustomHttpClient from '#http/customHttpClient'

export default class AuthDataSource {
  constructor(private readonly httpClient: CustomHttpClient) {}

  public logIn = async (parameters: LogInParams): Promise<LogInResponse> => {
    const url = `${environment.apiBaseUrl}/auth`
    const body = JSON.stringify(parameters)

    return this.httpClient
      .post(url, body, {
        headers: {
          'content-type': 'application/json'
        }
      })
      .then((response) => {
        const { data, status } = response

        if (status === 200) {
          return {
            success: true,
            token: data?.token,
            expiresAt: data?.expiresAt,
            message: 'Success'
          }
        }

        return {
          success: false,
          message: data?.errors ? data?.errors[0]?.message : 'Error logging user'
        }
      })
  }

  public signUp = async (resetPass: boolean, parameters: SignUpParams): Promise<SignUpResponse> => {
    const url = resetPass
      ? `${environment.apiBaseUrl}/users/forgot-password`
      : `${environment.apiBaseUrl}/users/register`
    const body = JSON.stringify(parameters)

    return this.httpClient
      .post(url, body, {
        headers: {
          'content-type': 'application/json'
        }
      })
      .then((response) => {
        const { data, status } = response

        if (status === 200) {
          return {
            success: true,
            message: 'Success'
          }
        }

        return {
          success: false,
          message: data?.errors ? data?.errors[0]?.message : 'Error sending code'
        }
      })
  }

  public validateCode = async (
    resetPass: boolean,
    parameters: ValidateCodeParams
  ): Promise<ValidateCodeResponse> => {
    const url = resetPass
      ? `${environment.apiBaseUrl}/users/forgot-password/${parameters.key}`
      : `${environment.apiBaseUrl}/users/register/${parameters.key}`

    return this.httpClient.get(url).then((response) => {
      const { data, status } = response

      if (status === 200) {
        return {
          user: data,
          success: true,
          message: 'Success'
        }
      }

      return {
        user: null,
        success: false,
        message: data?.errors ? data?.errors[0]?.message : 'Error validating code'
      }
    })
  }

  public updateUser = async (
    resetPass: boolean,
    parameters: UpdateUserParams
  ): Promise<UpdateUserResponse> => {
    const url = resetPass
      ? `${environment.apiBaseUrl}/users/forgot-password`
      : `${environment.apiBaseUrl}/users/register`
    const body = JSON.stringify(parameters)

    return this.httpClient
      .put(url, body, {
        headers: {
          'content-type': 'application/json'
        }
      })
      .then((response) => {
        const { data, status } = response

        if (status === 200) {
          return {
            success: true,
            message: 'Success'
          }
        }

        return {
          success: false,
          message: data?.errors ? data?.errors[0]?.message : 'Error updating user'
        }
      })
  }
}
