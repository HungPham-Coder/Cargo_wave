import BaseApi from "./app";

const resource = "roles";

const findAllWithPaging = async (
  search: string,
  pageIndex: number,
  pageSize: number,
  status: boolean
): Promise<any> => {
  try {
    const params: any = {
      ...(pageIndex && { pageIndex }),
      ...(pageSize && { pageSize }),
      ...(search && { search }),
      ...(status && { status }),
    };

    const response = await BaseApi.get(`/${resource}/findAllWithPaging`, {
      params,
    });
    console.log("Response: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error findAllWithPaging: ", error);
    return false;
  }
};

const createRole = async (values: any): Promise<any> => {
  try {
    const response = await BaseApi.post(`/${resource}/createRoles`, values);
    return response.data;
  } catch (error) {
    console.log("Error createRole API: ", error);
    return false;
  }
};

const updateRoleNameByID = async (id: string, name: string): Promise<any> => {
  try {
    const response = await BaseApi.put(
      `/${resource}/updateRoleNameByID/${id}/name`,
      { name }
    );
    return response.data;
  } catch (error) {
    console.log("Error updateRoleNameByID: ", error);
    return false;
  }
};

const updateRoleStatus = async (
  roleID: string,
  status: boolean
): Promise<any> => {
  try {
    const response = await BaseApi.put(
      `/${resource}/updateRoleStatus/${roleID}/${status}`
    );
    return response.data;
  } catch (error) {
    console.log("Error updateRoleStatus: ", error);
    return false;
  }
};

const assignPermissionsToRole = async (
  roleId: string,
  permissionIDs: string[]
) => {
  try {
    const response = await BaseApi.patch(`/${resource}/assignPermissions/`, {
      roleId,
      permissionIDs,
    });
    return response.data;
  } catch (error) {
    console.log("Error update permission status class: ", error);
    return false;
  }
};

const getPermissionsByRoleId = async (id: string) => {
  try {
    const response = await BaseApi.get(
      `/${resource}/getPermissionsByRoleId/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error findAll class: ", error);
    return false;
  }
};

const getPermissionsNotAssignedByRoleId = async (id: string) => {
  try {
    const response = await BaseApi.get(
      `/${resource}/getPermissionsNotAssignedByRoleId/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error findAll class: ", error);
    return false;
  }
};

const RoleApi = {
  findAllWithPaging,
  createRole,
  updateRoleNameByID,
  updateRoleStatus,
  assignPermissionsToRole,
  getPermissionsByRoleId,
  getPermissionsNotAssignedByRoleId,
};

export default RoleApi;
