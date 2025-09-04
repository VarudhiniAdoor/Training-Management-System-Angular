export const environment = {
  production: true,
  apiBaseUrl: 'https://localhost:7120', // set for prod
  endpoints: {
    login: '/api/auth/login',
    register: '/api/auth/register'
  },
  jwtAudience: 'TmsClient',
  jwtIssuer: 'TmsApi'
};

