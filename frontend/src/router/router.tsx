import { LandingPage } from "../app/landingPage/page";
import { LoginPage } from "../app/login/page";
import routes from "./routes";
import RoutesList from "../app/routes/page";
import { RegisterPage } from "../app/register/page";
import { ForgotPassordPage } from "../app/forgot-password/page";

import Link from "next/link";

export default function Page() {
  const router = [
    {
      path: routes.root,
      element: <LandingPage />,
    },
    {
      path: routes.login,
      element: <LoginPage />,
    },
    {
      path: routes.register,
      element: <RegisterPage />,
    },
    {
      path: routes.forgotPassword,
      element: <ForgotPassordPage />,
    },

    { path: routes.landing.route, element: <RoutesList /> },
  ];


}
