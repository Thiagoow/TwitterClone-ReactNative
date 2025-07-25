const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

let environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3333'
}

if (!development) {
  environment = {
    production: true,
    apiBaseUrl: 'http://172.31.16.124:3333'
  }
}

export default environment
