import BaseApi from "./app";

interface RegisterPayload {
  name: string;
  phone: string;
  position?: string;
  born?: string;
  email: string;
  password: string;
}

const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await BaseApi.post("auth/login", {
      email,
      password,
    });
    console.log("data: ", response.data);

    if (response.status === 201) {
      localStorage.setItem("jwtAccessToken", response.data.accessToken);
      localStorage.setItem("jwt", response.data.refreshToken);
      localStorage.setItem("jwtAccessExpire", response.data.accessExpire);
      localStorage.setItem("jwtRefreshExpire", response.data.refreshExpire);
      localStorage.setItem("user", JSON.stringify(response.data.user)); 
      // localStorage.setItem("roles", JSON.stringify(response.data.user.roles)); 
      localStorage.setItem("permissions", JSON.stringify(response.data.permissions)); 
      window.dispatchEvent(new Event("storage"));
      return true;
    }
    return false;
  } catch (error) {
    console.log("Wrong email or password", error);
    return false;
  }
};

const authorize = async (): Promise<any | undefined> => {
  try {
    const id = localStorage.getItem("userId");
    if (!id) throw new Error("User ID not found in localStorage");

    const response = await BaseApi.get(`/User/GetById/${id}`);
    return response.data;
    // Uncomment if using local user data
    // const user = JSON.parse(localStorage.getItem("user")) || {};
    // return user;
  } catch (error) {
    console.log("Error getting user: ", error);
    return undefined;
  }
};

const register = async (payload: RegisterPayload): Promise<boolean> => {
  try {
    const response = await BaseApi.post("auth/register", payload);
    console.log("response: ", response.status);
    return response.status === 200;
  } catch (error) {
    console.log("Error during registration: ", error);
    return false;
  }
};

const refresh = async (refreshToken: string): Promise<any | undefined> => {
  try {
    const response = await BaseApi.post("auth/refresh", { refreshToken });
    return response;
  } catch (error) {
    console.error("Error during token refresh:", error);
    return { error: "Error refreshing token" };
  }
};

const AuthApi = {
  login,
  authorize,
  register,
  refresh,
};

export default AuthApi;
