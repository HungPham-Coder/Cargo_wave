const routes = {
  root: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  landing: {
    profile: "profile",
    route: "route",
    about: "about"
  },
};

export const UnauthorizedRoutes = [
  routes.login,
  routes.register,
  routes.forgotPassword,
];

export default routes;
