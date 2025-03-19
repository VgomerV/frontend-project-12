const routes = {
  baseURL: '/api/v1',
  login: '/login',
  signup: '/signup',
  channels: '/channels',
  messages: '/messages',
};

export default (targetRoute) => `${routes.baseURL}${routes[targetRoute]}`;
