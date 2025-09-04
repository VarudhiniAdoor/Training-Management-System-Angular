export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:7120', // Change if your API runs on a different port
  endpoints: {
    login: '/api/auth/login',
    register: '/api/auth/register'
  },
  jwtAudience: 'TmsClient',
  jwtIssuer: 'TmsApi'
};
