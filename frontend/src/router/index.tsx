import { createBrowserRouter, RouteObject } from "react-router-dom";
import RootRoute from "./RootRoute";
import routes from "./routes";

// Assuming routes is defined somewhere with the necessary paths
const router: RouteObject[] = [
    {
        path: routes.root,
        element: <RootRoute />,
        // errorElement: <PageNotFound />,
        children: [
            {
                path: routes.login,
                // element: <LoginPage />,
            },
            {
                path: routes.register,
                // element: <RegisterAccountPage />,
            },
            {
                path: routes.dashboard.root,
                // element: <Dashboard />,
                children: [
                    {
                        path: routes.dashboard.home,
                        // element: <HomePage />,
                    },
                ],
            },
        ],
    },
];

export const browserRouter = createBrowserRouter(router) as ReturnType<typeof createBrowserRouter>;
