import axios from "axios";

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config";

// import { getAccessToken, getRefreshToken, setAccessToken, getType } from '../utils/common-utils';

import { getAccessToken, getType } from "../utils/common-utils";
// import { error } from "console";

// const API_URL = "http://localhost:8000";
const API_URL = " ";
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 640000, //logout timing
  headers: {
    "content-type": "application/json",
    //   "content-type": "multipart/form-data",
  },
});

axiosInstance.interceptors.request.use(
  // (req) => {
  //   if (req?.TYPE?.params) {
  //     req.params = req?.TYPE?.params;
  //   } else if (req?.TYPE?.query) {
  //     req.url = req.url + "/" + req.TYPE?.query;
  //   }
  // Add configurations here
  function (config) {
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }

    // return req;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
///////////////////////////////
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isFailure: true, status: string, msg: string, code: int }
//////////////////////////////
const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};
///////////////////////////////
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isError: true, status: string, msg: string, code: int }
//////////////////////////////

const ProcessError = async (error) => {
  if (error.response) {
    // Request made and server responded with a status code
    // that falls out of the range of 2xx
    if (error.response?.status === 403) {
      // const { url, config } = error.response;
      // console.log(error);
      // try {
      //     let response = await API.getRefreshToken({ token: getRefreshToken() });
      //     if (response.isSuccess) {
      sessionStorage.clear();
      //         setAccessToken(response.data.accessToken);

      //         const requestData = error.toJSON();

      //         let response1 = await axios({
      //             method: requestData.config.method,
      //             url: requestData.config.baseURL + requestData.config.url,
      //             headers: { "content-type": "application/json", "authorization": getAccessToken() },
      //             params: requestData.config.params
      //         });
      //     }
      // } catch (error) {
      //     return Promise.reject(error)
      // }
    } else {
      console.log("ERROR IN RESPONSE: ", error.toJSON());
      return {
        isError: true,
        msg: API_NOTIFICATION_MESSAGES.responseFailure,
        code: error.response.status,
      };
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.log("ERROR IN RESPONSE: ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("ERROR IN RESPONSE: ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};

// For POST requests
axiosInstance.interceptors.response.use(
  (response) => {
    // Stop global loader here
    return processResponse(response);
  },
  (err) => {
    // Stop global loader here
    return Promise.reject(ProcessError(err));
  }
);

//////////////////

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  console.log(key, value);
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      // data: body,

      // responseType: value.responseType,

      //data: value.method === "DELETE" ? "" : body,
      data: value.method === "DELETE" ? {} : body,
      
      responseType: value.responseType,
      //   ...(value?.headers &&
      //  {headers: value?.headers}),

      // / / / / / / research error zone

      //  headers: {
      //      authorization: getAccessToken(),...(value?.headers &&
      //     {headers: value?.headers})},

      headers: {
        ...(value?.headers && value?.headers),
        authorization: getAccessToken(),
      },
      TYPE: getType(value, body), //value (params , quiry) pass by categories

      // /////////////
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentCompleted);
        }
      },
    });
}

export { API };
