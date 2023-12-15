import { Vexile } from '@/components';
import { styled } from '@/stitches.config';

export const Wrapper = styled(Vexile, {
  position: 'relative',
  padding: '3rem 0',
});
export const LoadWrapper = styled(Vexile, {
  background: '#34343480',
  position: 'absolute',
  top: 0,
  transition: 'all .2s ease',
  opacity: 0,
  visibility: 'hidden',
  '&.load': {
    zIndex: 10,
    opacity: 1,
    visibility: 'visible',
  },
});

export const DatabaseSpan = styled('span', {
  fontSize: '5rem',
  color: '#fff',
  fontWeight: 600,
});
export const TableSpan = styled('span', {
  fontSize: '3rem',
  color: '#f9f9f9',
  fontWeight: 500,
});

