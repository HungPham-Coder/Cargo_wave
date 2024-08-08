import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppHeader from "./layouts/header";
import routes from "./router/route";
import AppFooter from "./layouts/footer";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppHeader></AppHeader>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      <AppFooter></AppFooter>
    </BrowserRouter>
  );
}

export default App;
