import { styled } from '@/stitches.config';

export const Wrapper = styled('div', {
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
