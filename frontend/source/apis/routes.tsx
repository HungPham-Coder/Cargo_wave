import BaseApi from "./app";

const resource = "routes";

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

const findAllBySearch = async (search: string) => {
  try {
    let params: any = {};

    if (search) {
      params.search = search;
    }

    // Make API request with proper params
    const response = await BaseApi.get(`/${resource}/findAllBySearch`, {
      params: params,
    });
    console.log("Response: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error finding routes: ", error);
    return false;
  }
};

const findRouteById = async (id: any) => {
  try {
    const response = await BaseApi.get(`/${resource}/findRouteByID/${id}`); // Adjust endpoint as necessary
    return response.data;
  } catch (error) {
    console.log("Error fetching route by ID: ", error);
    return false;
  }
};

const createRoute = async (values: any) => {
  try {
    const response = await BaseApi.post(`/${resource}/create`, values);
    return response.data;
  } catch (error) {
    console.log("Error create permission API: ", error);
    return false;
  }
};

const updateRoleByID = async (id: string, name: any) => {
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

const RouteApi = {
  findAll,
  findAllBySearch,
  updateRoleByID,
  createRoute,
  findRouteById,
};

export default RouteApi;
