const routes = {
  root: "/",
  login: `/login`,
  register: `/register`,
  forgotPassword: `/forgot-password`,
  profile: `/profile`,
  history: `/history`,
  route: `/routes`,
  routeDetail: (id: string) => `/routeDetail/${id}`,
  about: `/about`,
  userManagement: `/userManagement`,
  roleManagement: `/roleManagement`,
  permissionManagement: `/permissionManagement`,
};

export const UnauthorizedRoutes = [
  routes.login,
  routes.register,
  routes.forgotPassword,
];

export default routes;
