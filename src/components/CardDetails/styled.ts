import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { theme } from 'styles/theme';

export const DetailRow = styled(Typography)`
  &:not(:last-child) {
    margin: ${theme.spacing(1)} 0;
  }
`;

export const Bold = styled.span`
  font-weight: bold;
`;
