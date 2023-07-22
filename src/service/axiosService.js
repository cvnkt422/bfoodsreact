import axios from "axios";
import config from "../config/config";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const axiosservice = async (method, path, data, token) => {
  let payload = data;
  let response;
  const url = config.url;
  let id_oken = token === "" || token === undefined ? "" : "Bearer " + token;

  console.log("token is " + token);

  try {
    response = await axios({
      url: `${url}/${path}`,
      method: `${method}`,
      data: payload,
      headers: {
        Authorization: id_oken,
      },
    });
  } catch (error) {
    if (error.response) {
      response = error.response;
    } else if (error.request) {
      response = error.request;
      response.status = 404;
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
