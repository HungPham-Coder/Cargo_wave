import BaseApi from "./app";

const resource = "permissions";

const findAll = async () => {
  try {
    // Make API request with proper params
    const response = await BaseApi.get(`/${resource}/findAll`, {});
    console.log("Respone: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error enroll group: ", error);
    return false;
  }
};
const findPermissionEnabled = async () => {
  try {
    // Make API request with proper params
    const response = await BaseApi.get(
      `/${resource}/findPermissionEnabled`,
      {}
    );
    console.log("Respone: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error enroll group: ", error);
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

const createPermission = async (values: any) => {
  try {
    const response = await BaseApi.post(
      `/${resource}/createPermissions`,
      values
    );
    return response.data;
  } catch (error) {
    console.log("Error create permission API: ", error);
    return false;
  }
};

const updatePermissionByID = async (id: string, name: any) => {
  try {
    const response = await BaseApi.put(
      `/${resource}/updatePermissionNameByID/${id}/name`,
      { name }
    );
    return response.data;
  } catch (error) {
    console.log("Error findAll class: ", error);
    return false;
  }
};

const updatePermissionStatus = async (
  permissionID: string,
  status: boolean
) => {
  try {
    const response = await BaseApi.put(
      `/${resource}/updatePermissionStatus/${permissionID}/${status}`
    );
    return response.data;
  } catch (error) {
    console.log("Error update permission status class: ", error);
    return false;
  }
};


const PermissionApi = {
  findAll,
  findPermissionEnabled,
  findAllWithPaging,
  updatePermissionByID,
  createPermission,
  updatePermissionStatus,
  
};

export default PermissionApi;
