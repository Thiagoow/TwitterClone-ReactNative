import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { getUserToken } from '#utils/getUserToken'

export default class CustomHttpClient {
  private axiosInstance: AxiosInstance
  private navigation: NativeStackNavigationProp<any>
  private userToken: string | null = null

  constructor() {
    this.axiosInstance = axios.create()
    this.navigation = useNavigation()
    this.userToken = getUserToken()

    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add Authorization to header params:
        if (this.userToken) {
          config.headers.Authorization = `Bearer ${this.userToken}`
        }
        return config
      },
      (error) => {
        if (error.response) {
          // Handle response even with non-2XX status codes:
          return Promise.resolve({
            data: error.response.data,
            status: error.response.status
          })
        }
        return Promise.reject(error)
      }
    )

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        // Handle unauthorized access:
        if (error.response.status === 401) {
          this.navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
        }

        if (error.response) {
          // Handle response even with non-2XX status codes:
          return Promise.resolve({
            data: error.response.data,
            status: error.response.status
          })
        }
        return Promise.reject(error)
      }
    )
  }

  // Expose methods axios methods:
  public async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.axiosInstance.get(url, config)
  }

  public async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.axiosInstance.post(url, data, config)
  }

  public async put(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.axiosInstance.put(url, data, config)
  }

  public async delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.axiosInstance.delete(url, config)
  }
}
