import BaseApi from "./app";

const resource = "roles";

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
    const response = await BaseApi.get(`/${resource}/findAll`, {
      params: params,
    });
    console.log("Respone: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error enroll group: ", error);
    return false;
  }
};

const createRole = async (values: any) => {
  try {
    const response = await BaseApi.post(`/${resource}/createRoles`, values);
    return response.data;
  } catch (error) {
    console.log("Error createRole API: ", error);
    return false;
  }
};

const updateRoleNameByID = async (id: string, name: string) => {
  try {
    const response = await BaseApi.put(
      `/${resource}/updateRoleNameByID/${id}/name`,
      { name }
    );
    return response.data;
  } catch (error) {
    console.log("Error findAll class: ", error);
    return false;
  }
};

const updateRoleStatus = async (roleID: string, status: boolean) => {
  try {
    const response = await BaseApi.put(
      `/${resource}/updateRoleStatus/${roleID}/${status}`
    );
    return response.data;
  } catch (error) {
    console.log("Error enableRole class: ", error);
    return false;
  }
};

const RoleApi = {
  findAllWithPaging,
  updateRoleNameByID,
  createRole,
  updateRoleStatus,
};

export default RoleApi;
