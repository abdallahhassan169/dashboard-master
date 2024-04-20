import axios from "axios";
import { backEnd } from "./config";

export const postApi = async (url, data) => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      authorization: token,
    };
    const requestConfig = {
      headers,
    };
    const request = await axios.post(backEnd + url, data, requestConfig);
    const response = request.data;

    return response;
  } catch (e) {
    return e;
  }
};
