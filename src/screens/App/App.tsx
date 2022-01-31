import { Suspense, lazy } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { NotFound } from './components';
import { Logo, Wrapper } from './styled';

const Home = lazy(() => import('screens/Home'));
const Details = lazy(() => import('screens/Details'));

export const App = () => {
  return (
    <Wrapper>
      <Link to='/'>
        <Logo />
      </Link>

      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<CircularProgress />}>
              <Home />
            </Suspense>
          }
        />

        <Route
          // TODO: resourceType regexp
          // https://github.com/remix-run/react-router/discussions/8132
          path='/:resourceType/:resourceId'
          element={
            <Suspense fallback={<CircularProgress />}>
              <Details />
            </Suspense>
          }
        />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Wrapper>
  );
};
