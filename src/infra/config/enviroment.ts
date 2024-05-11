const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

let environment = {
  production: false,
  apiBaseUrl: 'http://34.236.154.4:3333'
}

if (!development) {
  environment = {
    production: true,
    apiBaseUrl: 'http://localhost:3333'
  }
}

export default environment
