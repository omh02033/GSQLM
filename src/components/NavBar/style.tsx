import { styled } from '@/stitches.config';
import { Hexile, Vexile } from '@/components';

export const Wrapper = styled(Vexile, {
  position: 'absolute',
  zIndex: 1000,
  transform: 'translateY(-50%)',
  top: '50%',
  left: 0,
  width: '230px',
  height: '90%',
  borderRadius: '15px',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  background: '#404040',
});

export const LogoContainer = styled(Hexile, {
  '-webkit-user-select': 'none',
  '-webkit-user-drag': 'none',
  '-webkit-app-region': 'no-drag',
  padding: '5rem 3rem',
  height: '100%',
  transition: 'height 1s ease',
  '& > img': {
    '-webkit-user-select': 'none',
    '-webkit-user-drag': 'none',
    '-webkit-app-region': 'no-drag',
  },
  '&.loaded': {
    height: '120px',
  },
});
export const Title = styled('span', {
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '6rem',
});
export const SubTitle = styled('span', {
  color: '#ffffff88',
  fontWeight: 500,
  fontSize: '1.7rem',
});

export const TableWrapper = styled(Vexile, {
  flex: 1,
  overflow: 'auto',
  padding: '0 5rem 5rem 0',
  'scrollbar-width': 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

export const TableBox = styled(Hexile, {
  borderRadius: '0 4rem 4rem 0',
  cursor: 'pointer',
  padding: '1rem 2rem 1rem 5rem',
  fontSize: '2.5rem',
  color: '#f9f9f9',
  '&:hover': {
    background: '#ffffff2b',
  },
  '&:active': {
    background: '#ffffff19',
  },
  '&.current': {
    background: '#a476e9',
  },
});
