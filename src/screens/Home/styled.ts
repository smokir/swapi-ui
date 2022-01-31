import styled from '@emotion/styled';
import { Box, Paper } from '@mui/material';

import { theme } from 'styles/theme';

export const Wrapper = styled(Paper)`
  display: flex;
  align-items: flex-start;
  width: 100%;
  column-gap: ${theme.spacing(2)};
  padding: ${theme.spacing(3)};

  @media screen and (max-width: 580px) {
    flex-direction: column;
  }
`;

export const Body = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: ${theme.spacing(2)};
  padding: ${theme.spacing(0.5)};
`;
