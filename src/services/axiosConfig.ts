import axios, { AxiosError } from 'axios';
import { useCookies } from 'react-cookie';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [cookies, setCookie] = useCookies(['token']);
function handleError(error: AxiosError) {
  if (axios.isCancel(error)) {
    return 'Axios is canceled';
  }
  const { response }: AxiosError = error;
  const { status, data }: any = response;
  return { status, data };
}

export const cancelTokenSource = axios.CancelToken.source();
const httpInstance = axios.create({
  timeout: 5000,
  // baseURL: '/api/v1/',
  headers: {
    token: cookies.token,
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'POST,PUT,PATCH,GET, DELETE,OPTIONS',
    'Access-Control-Allow-Headers':
        // eslint-disable-next-line max-len
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  },
  withCredentials: false,
  baseURL: 'https://car-trede-server.onrender.com/api/v1/',
});

Object.setPrototypeOf(httpInstance, axios);

httpInstance.interceptors.request.use(async (config) => {
  // eslint-disable-next-line no-param-reassign
  config.cancelToken = cancelTokenSource.token;
  return config;
});

httpInstance.interceptors.response.use(
  (res) => res.data,
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
  ,
);

export default httpInstance;
