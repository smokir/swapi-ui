import styled from '@emotion/styled';

import { theme } from 'styles/theme';

import { ReactComponent as SWLogo } from 'assets/swLogo.svg';

export const Logo = styled(SWLogo)`
  width: 250px;
  fill: ${theme.palette.text.primary};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding-bottom: ${theme.spacing(4)};
  max-width: 1200px;
  min-width: 280px;
  overflow: auto;
`;
