const routes = {
    root: "/",
    login: "/login",
    register: "/register",
    landingPage: {
      root: "/landingPage",
      dashboard: "dashboard",
      profile: "profile",
      // 
      
    },
  };
  
  export const UnauthorizedRoutes = [routes.login, routes.register];
  
  export default routes;