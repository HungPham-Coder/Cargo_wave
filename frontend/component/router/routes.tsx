const pages = "pages";

const routes = {
  root: "/",
  login: `${pages}/login`,
  register: `register`,
  forgotPassword: `forgot-password`,
  profile: `${pages}/profile`,
  route: `${pages}/routes`,
  about: `${pages}/about`,
};

export const UnauthorizedRoutes = [
  routes.login,
  routes.register,
  routes.forgotPassword,
];

export default routes;
