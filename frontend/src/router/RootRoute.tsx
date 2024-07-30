import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import routes, { UnauthorizedRoutes } from "./routes";

const RootRoute = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const isAuthenticated = useAuth();

	useEffect(() => {
		let path = pathname;

		if (UnauthorizedRoutes.includes(path)) {
			if (isAuthenticated) {
				navigate(`${routes.dashboard.root}/${routes.dashboard.home}`);
			}
		} else {
			if (!isAuthenticated) {
				navigate(routes.login);
			} else {
				if (path === routes.root) {
					path = routes.dashboard.root;
					const role = JSON.parse(localStorage.getItem("userRole") || '{}');
					// if (role?.name === roles.LEADER) {
					// 	path += `/${routes.dashboard.workersTasks}`;
					// }
					// else if (role?.name === roles.WORKER) {
					// 	path += `/${routes.dashboard.workersTasks}`;
					// }
					// else 
                    path += `/${routes.dashboard.home}`;
				}
				navigate(path);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, isAuthenticated]);

	return <Outlet />;
};

export default RootRoute;