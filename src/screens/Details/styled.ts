import styled from '@emotion/styled';
import { Paper } from '@mui/material';

import { theme } from 'styles/theme';

export const Wrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: ${theme.spacing(3)};
  row-gap: ${theme.spacing(2)};
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
