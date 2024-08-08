// src/routes.tsx
import { RouteObject } from 'react-router-dom';
import { LandingPage } from '../app/landingPage/page';
import RoutesList from '../app/routes/page';
import { LoginPage } from '../app/login/page';

const routes: RouteObject[] = [
  { path: '/', element: <LandingPage /> },
//   { path: '/price', element: <About /> },
  { path: '/route', element: <RoutesList /> },
  { path: '/login', element: <LoginPage /> },
];

export default routes;
