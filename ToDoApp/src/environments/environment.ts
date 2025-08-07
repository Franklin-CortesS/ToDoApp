export const environment = {
  production: true,
  API_URL: 'https://api-fpmqglkbmq-uc.a.run.app/',
  API_PATHS: {
    login: 'auth/login',
    logout: 'auth/logout',
    tasks: 'tasks',
    taskCreate: 'tasks/create',
    taskUpdate: 'tasks/update/{id}',
    taskDelete: 'tasks/delete/{id}',
  }
};
