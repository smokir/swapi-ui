import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from 'utils';
import { ResourceType, FetchResourcesReturn, GetResourcesResponse, Resource } from './types';

export const fetchResources = createAsyncThunk<
  FetchResourcesReturn,
  { resourceType: ResourceType; page: number; search: string }
>('RESOURCES/FETCH_RESOURCES', async ({ resourceType, page, search }) => {
  const { data } = await axiosInstance.get<GetResourcesResponse>(`/${resourceType}`, {
    params: { page, search },
  });

  return { resourceType, response: data, page, total: data.count };
});

export const fetchResource = createAsyncThunk<
  Resource,
  { resourceType: ResourceType; resourceId: string }
>('RESOURCES/FETCH_RESOURCE', async ({ resourceType, resourceId }) => {
  const { data } = await axiosInstance.get<Resource>(`/${resourceType}/${resourceId}`);
  return data;
});
