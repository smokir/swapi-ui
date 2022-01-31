import { Link } from 'react-router-dom';

import { CardContent, Typography, CardActionArea, Skeleton } from '@mui/material';

import { API_RESULTS_PER_PAGE } from 'constants/api';
import { useAppSelector } from 'store';
import { selectResourcesForCards, selectResourcesMeta } from 'store/modules/resources';

import { CardDetails } from 'components';

import { Wrapper, Content, StyledCard } from './styled';

const STUB_ARRAY = new Array(API_RESULTS_PER_PAGE).fill(1);

export const Grid = () => {
  const { resourceType, loading, error } = useAppSelector(selectResourcesMeta);
  const resources = useAppSelector(selectResourcesForCards);

  return (
    <Wrapper>
      {!loading && resources.length === 0 && !error && (
        <Typography variant='h5' color='text.secondary'>
          No data
        </Typography>
      )}

      {error && (
        <Typography variant='h5' color='text.secondary'>
          Error: {error}
        </Typography>
      )}

      <Content>
        {!loading &&
          resources.map(({ id, title, description, details }) => (
            <StyledCard key={id} elevation={8}>
              <CardActionArea
                component={Link}
                to={`/${resourceType}/${id}`}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Typography variant='body1'>{title}</Typography>

                  {description && (
                    <Typography variant='body2' color='text.secondary'>
                      {description}
                    </Typography>
                  )}

                  <CardDetails details={details} />
                </CardContent>
              </CardActionArea>
            </StyledCard>
          ))}

        {loading &&
          STUB_ARRAY.map((_, index) => (
            <StyledCard key={index} elevation={8}>
              <Skeleton variant='rectangular' sx={{ height: '100%' }} />
            </StyledCard>
          ))}
      </Content>
    </Wrapper>
  );
};
