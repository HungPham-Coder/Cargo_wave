import AppHeader from "./layouts/header";
import AppFooter from "./layouts/footer";
import Link from "next/link";
import routes from "./router/routes";
import { LandingPage } from "./app/landingPage/page";

const App: React.FC = () => {
  // const location = useLocation();
  // const shouldHideHeaderFooter = UnauthorizedRoutes.includes(location.pathname);
  return (
    <>
      <AppHeader />
      {/* <LandingPage></LandingPage> */}
      {/* <AppFooter /> */}
    </>
  );
};

export default App;
