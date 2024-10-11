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

const findAllWithPaging = async (
  search: string,
  pageIndex: number,
  pageSize: number
) => {
  try {
    let params: any = {};

    if (pageIndex) {
      params.pageIndex = pageIndex;
    }
    if (pageSize) {
      params.pageSize = pageSize;
    }

    if (search) {
      // Add search query to params if search is present
      params.search = search;
    }

    // Make API request with proper params
    const response = await BaseApi.get(`/${resource}/findAllWithPaging`, {
      params: params,
    });
    console.log("Respone: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error enroll group: ", error);
    return false;
  }
};

const getRolesByUserId = async (id: string) => {
  try {
    const response = await BaseApi.get(`/${resource}/getRolesByUserId/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error findAll class: ", error);
    return false;
  }
};

const getRolesNotAssignedByUserId = async (id: string) => {
  try {
    const response = await BaseApi.get(
      `/${resource}/getRolesNotAssignedByUserId/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error findAll class: ", error);
    return false;
  }
};

const assignRoleToUser = async (userId: string, roleIds: string[]) => {
  try {
    console.log("Payload sent to the server:", { userId, roleIds });

    const response = await BaseApi.patch(`/${resource}/assignRoles/`, {
      userId,
      roleIds,
    });
    return response.data;
  } catch (error) {
    console.log("Error update permission status class: ", error);
    return false;
  }
};

const UserApi = {
  findAll,
  findAllWithPaging,
  getRolesByUserId,
  getRolesNotAssignedByUserId,
  assignPermissionsToRole: assignRoleToUser,
};

export default UserApi;
