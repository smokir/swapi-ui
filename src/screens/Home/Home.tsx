import { SyntheticEvent, useCallback, useEffect, useMemo, ChangeEvent } from 'react';

import { MenuItem, MenuList, TextField, Typography, Pagination, debounce } from '@mui/material';

import { API_RESULTS_PER_PAGE } from 'constants/all';
import { useAppDispatch, useAppSelector } from 'store';
import {
  RESOURCE_TYPE,
  fetchResources,
  RESOURCE_TYPE_TITLE,
  selectResourcesMeta,
  setSearch,
  setPage,
  setResourceType,
  isResourceType,
} from 'store/modules/resources';

import { Grid } from './components';
import { Body, Wrapper } from './styled';
import { noop } from 'utils';

export const Home = () => {
  const dispatch = useAppDispatch();

  const { count, page, search, resourceType, loading } = useAppSelector(selectResourcesMeta);

  const pages = Math.ceil(count / API_RESULTS_PER_PAGE);

  const onChangeSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => dispatch(setSearch(e.target.value)),
    [dispatch],
  );

  const onChangeResourceType = useCallback(
    (e: SyntheticEvent<HTMLLIElement>) => {
      const value = e.currentTarget.dataset.resourceType;
      if (value && isResourceType(value)) {
        dispatch(setResourceType(value));
      } else {
        console.error(`Incorrect resource type data attribute: ${value}`);
      }
    },
    [dispatch],
  );

  const onChangePage = useCallback(
    (_: unknown, page: number) => dispatch(setPage(page)),
    [dispatch],
  );

  const fetch = useCallback(
    (resourceType, page, search) =>
      dispatch(fetchResources({ resourceType, page, search })).catch(noop),
    [dispatch],
  );

  const fetchDebounced = useMemo(() => debounce(fetch, 500), [fetch]);

  useEffect(() => {
    fetch(resourceType, page, search);
  }, [dispatch, fetch, page, resourceType]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (search) {
      fetchDebounced(resourceType, page, search);
    }
  }, [dispatch, fetch, search]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper elevation={1}>
      <MenuList>
        {Object.values(RESOURCE_TYPE).map(value => (
          <MenuItem
            key={value}
            selected={resourceType === value}
            data-resource-type={value}
            onClick={onChangeResourceType}
            disabled={loading}
          >
            <Typography variant='body2'>{RESOURCE_TYPE_TITLE[value]}</Typography>
          </MenuItem>
        ))}
      </MenuList>

      <Body>
        <TextField
          // label='Search'
          placeholder='Search ...'
          size='small'
          value={search}
          onChange={onChangeSearch}
          // TODO:
          // helperText={search && !loading && `${count} matching results`}
        />

        <Grid />

        <Pagination page={Number(page)} count={pages} onChange={onChangePage} disabled={loading} />
      </Body>
    </Wrapper>
  );
};
