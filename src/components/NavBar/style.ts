import { styled } from '@/stitches.config';
import { Hexile, Vexile } from '@/components';

export const Wrapper = styled(Vexile, {
  position: 'absolute',
  zIndex: 10,
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
