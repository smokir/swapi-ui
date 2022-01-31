import styled from '@emotion/styled';
import { Card } from '@mui/material';
import { theme } from 'styles/theme';

export const Wrapper = styled.div`
  min-height: 400px;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: ${theme.spacing(2)};
`;

export const StyledCard = styled(Card)`
  max-width: 330px;
  height: 190px;

  /* TODO: use MUI palette color */
  :after {
    content: '→';
    float: right;
    position: relative;
    top: -30px;
    width: 100%;
    height: 30px;
    color: transparent;
    background-color: transparent;
    background-image: linear-gradient(
      to top,
      #282727 4%,
      rgba(40, 39, 39, 0.9) 30%,
      rgba(40, 39, 39, 0)
    );
  }
`;
