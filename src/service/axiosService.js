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
      // headers: {
      //   Authorization:
      //     "Bearer eyJraWQiOiJFemdjYVZQYlRtR3JvVXA0QzZraTdRc0xmOFZUZEVKLXhHRHV5a1NkZDJ3IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULm9GM0drMmZaU0hobHFGMjl1aGxFbHlaQTR5SGZ4TTdnTXBmMkJUZlF3YlUub2FyMTN1dmQ2eFdkNDV4eDY1ZDciLCJpc3MiOiJodHRwczovL2Rldi0yNTI1MDg2MS5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2ODYwNzg1MjYsImV4cCI6MTY4NjA4MjEyNiwiY2lkIjoiMG9hOW1uNHpkZHR6RE00Zko1ZDciLCJ1aWQiOiIwMHU5bW9ibHprTjd4YjNJTDVkNyIsInNjcCI6WyJvZmZsaW5lX2FjY2VzcyIsImVtYWlsIiwib3BlbmlkIiwicHJvZmlsZSJdLCJhdXRoX3RpbWUiOjE2ODYwNzMyMjgsInN1YiI6ImN2bmt0NDIyQGdtYWlsLmNvbSIsImdyb3VwcyI6WyJFdmVyeW9uZSIsImFkbWluIiwiY3VzdG9tZXIiXX0.PnnudWAYYQrzJmgOzlwcREMuu0xc1N_ftZCjZTWeTbpOlckSsZ0daW2COoo44-nQZ8bLv2lPAwrriOcrhf-mm4Os6batjTKCM0_LxrfTSuFFrRW4mw8w_CpLfZR69TjnNprQOukDiJkP1TDPj_5tPYPSgIWEcf5TEk3neFm0LDupRxTjjohgY4KjoHMxbHRA9XGrBIRTiBFw_rbXx1tR6loSim_IC0uI5aRmjaMYj6kOMrM4LZtT6kANY1IjY1W_UGTlpUL3bS6lanSFGOKnqeHRwzUSxfUtv6fAiBrf510w3NtD5wvO0Cq2VSLrWSg2UXrXnXulDYT9rq7_Z8GXUA",
      // },
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      response = error.response;
    } else if (error.request) {
      response = error.request;
      response.status = 404;
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
