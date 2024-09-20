import BaseApi from "./app";

interface RegisterPayload {
  name: string;
  phone: string;
  position?: string;
  born?: string;
  email: string;
  password: string;
}

const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await BaseApi.post("auth/login", {
      name: username,
      password: password,
    });
    console.log("data: ", response.data);

    if (response.status === 200) {
      // const { access_token: jwt, userId, role } = response.data.result;
      const { access_token } = response.data;

      localStorage.setItem("jwt", access_token);
      // localStorage.setItem("userId", userId);
      // localStorage.setItem("userRole", JSON.stringify(role));
      return true;
    }
    return false;
  } catch (error) {
    console.log("Wrong user name or password", error);
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

const AuthApi = {
  login,
  authorize,
  register,
};

export default AuthApi;
