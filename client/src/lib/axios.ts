import axios, {type AxiosInstance } from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await generateRefreshToken();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const generateRefreshToken = async () => {
  try {
    await axiosInstance.post('/auth/refresh');
  } catch (error: any) {
    console.error(error);
  }
};


export default axiosInstance;



