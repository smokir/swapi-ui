import axios, { AxiosError, AxiosResponseTransformer } from 'axios';
import camelcaseKeys from 'camelcase-keys';

import { API_BASE_URL } from 'constants/all';

const defaultTransformResponse = axios.defaults.transformResponse as AxiosResponseTransformer[];

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  transformResponse: defaultTransformResponse.concat(data => camelcaseKeys(data, { deep: true })),
});

export function isAxiosError<T>(e: Error | AxiosError): e is AxiosError<T> {
  return e && 'isAxiosError' in e && e.isAxiosError;
}
