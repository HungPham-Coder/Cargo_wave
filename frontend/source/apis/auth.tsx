import { NextApiRequest, NextApiResponse } from "next";
import BaseApi from "./app";

interface RegisterPayload {
  name: string;
  phone: string;
  position?: string;
  born?: string;
  email: string;
  password: string;
}
const jwt = require('jsonwebtoken');
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

const resetPassword = async (password: string, id: any): Promise<any | undefined> => {
  try {
    const response = await BaseApi.post(`auth/reset-password?token=${id}`, { password });
    return response;
  } catch (error) {
    console.error("Error during implement:", error);
    return { error: "Error reset password" };
  }
}

const forgotPassword = async (to: string): Promise<any | undefined> => {
  try {
    const response = await BaseApi.post("auth/forgotPassword", { to });
    return response;
  } catch (error) {
    console.error("Error during token refresh:", error);
    return { error: "Error refreshing token" };
  }

}
const loginGoogle = async (): Promise<any> => {
  try {
    const response = await BaseApi.get("auth/google");
    console.log("Data from google: ", response.data);
    if (response.status === 200) {
      return response.data.accessToken;
    } else {
      console.error("Failed to get access token: ", response.data);
      return null; // Hoặc xử lý theo cách khác tùy vào yêu cầu của bạn
    }
  } catch (error) {
    console.error("Error during sigin GG:", error);
  }
  // try {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3001/auth/google', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       console.log(data); // Thông tin người dùng
  //       localStorage.setItem("jwtAccessToken", data.accessToken);
  //       localStorage.setItem("jwt", data.refreshToken);
  //       localStorage.setItem("jwtAccessExpire", data.accessExpire);
  //       localStorage.setItem("jwtRefreshExpire", data.refreshExpire);
  //       localStorage.setItem("user", JSON.stringify(data.user));
  //       // localStorage.setItem("roles", JSON.stringify(response.data.user.roles)); 
  //       localStorage.setItem("permissions", JSON.stringify(data.permissions));
  //       window.dispatchEvent(new Event("storage"));
  //       return true; // Gọi thành công
  //     } catch (error) {
  //       console.error("Can't call api: ", error);
  //       return false; // Gọi không thành công
  //     }
  //   };

  //   fetchUserData();
  //   return true
  // } catch (error) {
  //   console.error("Can't call api: ", error)
  //   return false
  // }

}
// const loginGg = async () : Promise<boolean> => {


//   try {
//     const response = await BaseApi.get("auth/google");
//     console.log ("data: ", response.data)

//     if (response.status === 201) {
//       localStorage.setItem("jwtAccessToken", response.data.accessToken);
//       localStorage.setItem("jwt", response.data.refreshToken);
//       localStorage.setItem("jwtAccessExpire", response.data.accessExpire);
//       localStorage.setItem("jwtRefreshExpire", response.data.refreshExpire);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       // localStorage.setItem("roles", JSON.stringify(response.data.user.roles)); 
//       localStorage.setItem("permissions", JSON.stringify(response.data.permissions));
//       window.dispatchEvent(new Event("storage"));
//     }
//     return true;
//   } catch (error) {
//     console.error("Error during sign in:", error);
//     return false;
//   }
// }

const checkToken = async (id: any): Promise<boolean> => {
  try {
    const response = await BaseApi.get(`users/findById/${encodeURIComponent(id)}`);
    console.log(response.data);
    return response.data.verify_token != null ? true : false;
  } catch (error) {
    console.error("Error during find User", error);
    return false;
  }
}
const AuthApi = {
  login,
  authorize,
  register,
  refresh,
  resetPassword,
  forgotPassword,
  loginGoogle,
  checkToken,
};

export default AuthApi;
