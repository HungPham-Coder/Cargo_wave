export const useAuth = () => {
	// const jwt = localStorage.getItem("jwt");
	// return jwt ? true : false;
	return !!localStorage.getItem("jwt");
};