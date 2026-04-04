import axios, { AxiosError, AxiosInstance, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { toast } from 'sonner';

import { END_POINT, MESSAGE_CODE, SYSTEM_ERROR } from '@/constants';
import { IResponse } from '@/interface';
import { useAuthStore } from '@/store';

import { envConfig } from './env';

let refreshTokenPromise: Promise<string> | null = null;

const defaultConfigs: CreateAxiosDefaults = {
  timeout: 15000,
  timeoutErrorMessage: SYSTEM_ERROR.TIMEOUT_ERROR.MESSAGE,
  withCredentials: true,
};

const refreshClient = axios.create({
  baseURL: envConfig.VITE_API_URL,
  ...defaultConfigs,
});

export const refreshAccessToken = async () => {
  if (!refreshTokenPromise) {
    refreshTokenPromise = refreshClient
      .post<IResponse<{ accessToken: string }>>(END_POINT.AUTH.REFRESH_TOKEN)
      .then((response) => {
        const accessToken = response.data.data?.accessToken ?? '';

        if (!accessToken) {
          throw new Error('Missing access token in refresh response');
        }

        useAuthStore.getState().setAccessToken(accessToken);

        return accessToken;
      })
      .catch((error) => {
        useAuthStore.getState().clearAuth();

        return Promise.reject(error);
      })
      .finally(() => {
        refreshTokenPromise = null;
      });
  }

  return refreshTokenPromise;
};

const createAxiosInstance = (baseURL: string, configs: CreateAxiosDefaults = defaultConfigs): AxiosInstance => {
  const instance = axios.create({ baseURL, ...configs });

  instance.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      config.headers['Pragma'] = 'no-cache';
      config.headers['Expires'] = '0';

      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    async (error: AxiosError) => {
      const originalRequest = error.config as typeof error.config & { _retry?: boolean };

      if (error.code === 'ECONNABORTED' || error.message === SYSTEM_ERROR.TIMEOUT_ERROR.MESSAGE) {
        toast.error(SYSTEM_ERROR.TIMEOUT_ERROR.MESSAGE);

        return Promise.reject(error);
      }

      if (!error.response) {
        toast.error(SYSTEM_ERROR.NETWORK_ERROR.MESSAGE);

        return Promise.reject(error);
      }

      if (
        error.response.status === 410 &&
        originalRequest &&
        !originalRequest._retry &&
        originalRequest.url !== END_POINT.AUTH.REFRESH_TOKEN
      ) {
        originalRequest._retry = true;

        return refreshAccessToken().then(() => instance(originalRequest));
      }

      if (error.response.status === 401) {
        useAuthStore.getState().clearAuth();
      }

      if (error.response.status !== 410) {
        const { message_code } = error.response.data as IResponse<null>;

        if (message_code) {
          const errorKey = MESSAGE_CODE[message_code as keyof typeof MESSAGE_CODE];
          toast.error(errorKey);
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

const axiosClient = createAxiosInstance(envConfig.VITE_API_URL);

export { axiosClient };
