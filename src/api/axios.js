import axios from "axios";

export const axiosApi = axios.create(
  {
    baseURL: 'https://api.aladhan.com/v1'
  }
)