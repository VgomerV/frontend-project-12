const routes = {
  baseURL: '/api/v1/',
  login: 'login',
  channels: 'channels',
  messages: 'messages',
};

export default (targetRoute) => `${routes.baseURL}${routes[targetRoute]}`;
