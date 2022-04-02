//utils
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '@store';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

interface useApiState {
  loading: boolean;
  data: any;
  error: any;
}

interface API {
  headers?: any | null;
  body?: any | null;
}

const useApi = ({
  url,
  method,
}: {
  url: string;
  method: string;
}): {
  res: useApiState;
  API: ({ body, headers }: API) => Promise<unknown>;
  controller: AbortController;
} => {
  const user = useSelector(selectUser);
  const [res, setRes] = useState<useApiState>({
    data: null,
    loading: false,
    error: null,
  });
  const controller = new AbortController();
  const API = async ({ body = null, headers = null }: API) => {
    if (user && user.token) {
      delete headers.auth_token;
    }
    const axiosHeaders = {
      //@ts-ignore
      ...headers,
      ...(user && user.token && { auth_token: user.token }),
    };
    return new Promise(async (resolve, reject) => {
      try {
        setRes(prevState => ({ ...prevState, error: null, loading: true }));
        //@ts-ignore
        const response = await axios({
          url,
          method,
          data: body,
          signal: controller.signal,
          headers: { ...axiosHeaders },
        });

        setRes(prevState => ({
          ...prevState,
          error: null,
          data: response.data,
          loading: false,
        }));
        resolve(response.data);
      } catch (err) {
        //@ts-ignore
        setRes(prevState => ({
          ...prevState,
          data: null,
          loading: false,
          error: err,
        }));
        console.log(`error with ${method} at endpoint ${url}`, err);
        reject(err);
      }
    });
  };

  return { res, API, controller };
};

export default useApi;
