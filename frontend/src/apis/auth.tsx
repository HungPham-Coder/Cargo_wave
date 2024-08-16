import BaseApi from "./app";

// Define types for responses and parameters
interface LoginResponse {
  result: {
    access_token: string;
    userId: string;
    role: string[];
  };
}

const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await BaseApi.post<LoginResponse>("/User/Login", {
      phoneNumber: username,
      password: password,
    });

    if (response.status === 200) {
      const { access_token: jwt, userId, role } = response.data.result;
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", JSON.stringify(role));
      return true;
    }
    return false;
  } catch (error) {
    console.log("Wrong phone number or password", error);
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

const register = async (
  email: string,
  fullName: string,
  password: string,
  roleId: string
): Promise<boolean> => {
  try {
    const response = await BaseApi.post("/User/Register", {
      email,
      fullName,
      password,
      roleId,
    });
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
