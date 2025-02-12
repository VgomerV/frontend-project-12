const routes = {
  baseURL: 'api/v1/',
  login: 'login',
};

export default (targetRoute) => `${routes.baseURL}${routes[targetRoute]}`;
