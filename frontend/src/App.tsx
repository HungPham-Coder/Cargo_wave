import { AppProps, Layout } from "antd";
import "./App.css";
import AppHeader from "./layouts/header/header";
import RoutesList from "./pages/routes/page";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <AppHeader></AppHeader>
      {/* <LoginPage></LoginPage> */}
      <RoutesList></RoutesList>
    </Layout>
  );
}

export default App;
