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
  pageSize: number,
  status: number,
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
      params.search = search;
    }
    if (status) {
      params.statusNumb = status;
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

const updateUserStatus = async (id: string, status: number): Promise<any> => {
  try {
    const response = await BaseApi.patch(
      `/${resource}/updateUserStatus/${id}/status`,
      {
        id,
        status,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error updateUserStatus: ", error);
    return false;
  }
};

const updateUser = async (id: string, values: any): Promise<any> => {
  try {
    const response = await BaseApi.put(`/${resource}/updateUser/${id}`, values);
    return response.data;
  } catch (error) {
    console.log("Error updateUser: ", error);
    return false;
  }
};

const findById = async (id: string) => {
  try {
    const response = await BaseApi.get(`/${resource}/findById/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error findById class: ", error);
    return false;
  }
};

const getTotalUsersByRole = async () => {
  try {
    const response = await BaseApi.get(`/${resource}/getTotalUsersByRole`);
    return response.data;
  } catch (error) {
    console.log("Error getTotalUsersByRole class: ", error);
    return false;
  }
};

const UserApi = {
  findAll,
  findAllWithPaging,
  getRolesByUserId,
  getRolesNotAssignedByUserId,
  assignRoleToUser,
  updateUserStatus,
  updateUser,
  findById,
  getTotalUsersByRole,
};

export default UserApi;
