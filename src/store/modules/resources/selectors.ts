import { createSelector } from '@reduxjs/toolkit';
import pick from 'lodash.pick';

import { RootState } from 'store';

import { resourcesAdapter } from './reducer';
import { RESOURCES_REDUCER_NAME } from './constants';
import { FormatterArgument, formatResourceForCard, formatResourceForDetails } from './utils';

export const selectResourcesMeta = (state: RootState) =>
  pick(state[RESOURCES_REDUCER_NAME], [
    'count',
    'loading',
    'resourceType',
    'page',
    'search',
    'error',
  ]);

export const { selectAll: selectResources, selectById: selectResourceById } =
  resourcesAdapter.getSelectors((state: RootState) => state[RESOURCES_REDUCER_NAME].entities);

export const selectResourcesForCards = createSelector(
  selectResources,
  selectResourcesMeta,
  (resources, { resourceType }) =>
    resources.map(resource =>
      formatResourceForCard({ resourceType, resource } as FormatterArgument),
    ),
);

export const selectResourceForDetails = createSelector(
  selectResourcesMeta,
  selectResourceById,
  ({ resourceType }, resource) =>
    resource
      ? formatResourceForDetails({ resourceType, resource } as FormatterArgument)
      : undefined,
);
