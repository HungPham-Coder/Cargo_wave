import BaseApi from "./app";

const resource = "locations";

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

const findAllByName = async (search: string) => {
  try {
    let params: any = {};

    if (search) {
      params.search = search;
    }

    // Make API request with proper params
    const response = await BaseApi.get(`/${resource}/findAllByName`, {
      params: params,
    });
    console.log("Response: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error finding routes: ", error);
    return false;
  }
};


const LocationApi = {
  findAllBySearch,
  findAllByName,
};

export default LocationApi;
