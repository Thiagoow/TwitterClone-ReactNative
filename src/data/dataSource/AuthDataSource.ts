import axios from 'axios'
import { LogInParams, LogInResponse, GetUserInfoResponse } from '#model/auth'
import environment from '#config/enviroment'

export default class AuthDataSource {
  public logIn = async (parameters: LogInParams): Promise<LogInResponse> => {
    const url = `${environment.apiBaseUrl}/auth`
    const body = JSON.stringify(parameters)

    return axios
      .post(url, body, {
        headers: {
          'content-type': 'application/json'
        },
        timeout: 2000
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
      .catch((error) => {
        console.error(error)
        throw new Error(error)
      })
  }

  public GetUserInfo = async (): Promise<GetUserInfoResponse> => {
    const url = `${environment.apiBaseUrl}/users`

    return axios
      .get(url)
      .then((response) => {
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
          message: data?.errors ? data?.errors[0]?.message : 'Error finding user'
        }
      })
      .catch((error) => {
        console.error(error)
        throw new Error(error)
      })
  }
}
