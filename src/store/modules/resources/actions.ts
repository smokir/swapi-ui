import { createAction } from '@reduxjs/toolkit';

import { ResourceType } from './types';

export const setResourceType = createAction<ResourceType>('RESOURCES/SET_TYPE');

export const setPage = createAction<number>('RESOURCES/SET_PAGE');

export const setSearch = createAction<string>('RESOURCES/SET_SEARCH');

export const editResourceTitle =
  createAction<{ id: string; title: string }>('RESOURCES/EDIT_TITLE');
