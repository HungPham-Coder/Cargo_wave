import BaseApi from "./app";

const resource = "users";

const findAll = async () => {
  try {
    const response = await BaseApi.get(`/${resource}/findAll`);
    return response.data;
  } catch (error) {
    console.log("Error findAll class: ", error);
    return false;
  }
};

const UserApi = {
  findAll,
};

export default UserApi;
