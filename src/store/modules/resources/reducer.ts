import { createEntityAdapter, createReducer, EntityState } from '@reduxjs/toolkit';

import { Resource, ResourceType } from './types';
import { fetchResource, fetchResources } from './thunks';
import { getResourceId } from './utils';
import { RESOURCE_TYPE } from './constants';
import { setPage, setSearch, setResourceType, editResourceTitle } from './actions';

export const resourcesAdapter = createEntityAdapter<Resource>({
  selectId: getResourceId,
});

const initialState: {
  loading: boolean;
  page: number;
  search: string;
  resourceType: ResourceType;
  count: number;
  entities: EntityState<Resource>;
  error: string | null;
} = {
  loading: true,
  page: 1,
  search: '',
  resourceType: RESOURCE_TYPE.PEOPLE,
  count: 0,
  entities: resourcesAdapter.getInitialState(),
  error: null,
};

export const resourcesReducer = createReducer(initialState, builder => {
  builder
    .addCase(fetchResources.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchResources.fulfilled, (state, action) => {
      resourcesAdapter.setAll(state.entities, action.payload.response.results);
      state.count = action.payload.response.count;
      state.loading = false;
    })
    .addCase(fetchResources.rejected, (state, action) => {
      resourcesAdapter.removeAll(state.entities);
      state.loading = false;
      state.error = action.error.message || 'Unknown error';
    })
    .addCase(setSearch, (state, action) => {
      state.search = action.payload;
      state.page = 1;
    })
    .addCase(setPage, (state, action) => {
      state.page = action.payload;
    })
    .addCase(setResourceType, (state, action) => {
      state.resourceType = action.payload;
      state.page = 1;
    });

  builder
    .addCase(fetchResource.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchResource.fulfilled, (state, action) => {
      resourcesAdapter.upsertOne(state.entities, action.payload);
      state.loading = false;
    })
    .addCase(fetchResource.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown error';
    })
    .addCase(editResourceTitle, (state, action) => {
      resourcesAdapter.updateOne(state.entities, {
        id: action.payload.id,
        changes:
          state.resourceType === RESOURCE_TYPE.FILMS
            ? {
                title: action.payload.title,
                edited: new Date().toISOString(),
              }
            : {
                name: action.payload.title,
                edited: new Date().toISOString(),
              },
      });
    });
});
