import axios from "axios";
import config from "../config/config";
import React from "react";

const axiosservice = async (method, path, data) => {
  let payload = data;
  let response;
  const url = config.url;

  try {
    response = await axios({
      url: `${url}/${path}`,
      method: `${method}`,
      data: payload,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      response = error.response;
    } else if (error.request) {
      response = error.request;
      console.log("printing error request", error);
    } else {
      response.data = "not_found";
    }
  }
  return response;
};

const fetchCategories = async () => {
  const result = await axiosservice("GET", "admin/fetchAllCategories/", "");
  return result.data;
};

export { axiosservice, fetchCategories };

// export default function axiosService(method, path, data) {
//   return axiosservice(method, path, data);
// }
