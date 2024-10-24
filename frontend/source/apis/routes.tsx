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

const findAllBySearch = async (search?: string, status?: number) => {
  try {
    let params: any = {};

    if (status) {
      params.status = status;
    }
    if (search) {
      params.search = search;
    }
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

const updateRouteByID = async (id: any, values: any) => {
  try {
    const response = await BaseApi.put(
      `/${resource}/updateRouteByID/${id}`,
      values
    );
    return response.data;
  } catch (error) {
    console.log("Error findAll class: ", error);
    return false;
  }
};

const getRouteStatistics = async () => {
  try {
    const response = await BaseApi.get(`/${resource}/getRouteStatistics`);
    return response.data;
  } catch (error) {
    console.log("Error getRouteStatistics class: ", error);
    return false;
  }
};

const getTotalRoutes = async () => {
  try {
    const response = await BaseApi.get(`/${resource}/getTotalRoutes`);
    return response.data;
  } catch (error) {
    console.log("Error getTotalRoutes class: ", error);
    return false;
  }
};

const RouteApi = {
  findAll,
  findAllBySearch,
  updateRouteByID,
  createRoute,
  findRouteById,
  getRouteStatistics,
  getTotalRoutes,
};

export default RouteApi;
