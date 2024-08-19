const routes = {
  root: "/",
  login: `/login`,
  register: `/register`,
  forgotPassword: `/forgot-password`,
  profile: `/profile`,
  route: `/routes`,
  about: `/about`,
};

export const UnauthorizedRoutes = [
  routes.login,
  routes.register,
  routes.forgotPassword,
];

export default routes;
