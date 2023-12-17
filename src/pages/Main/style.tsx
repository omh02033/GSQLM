import { Hexile, Vexile } from '@/components';
import { styled } from '@/stitches.config';

export const Wrapper = styled(Vexile, {
  position: 'relative',
  padding: '3rem 0',
});
export const LoadWrapper = styled(Vexile, {
  background: '#343434cf',
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

export const DataContainer = styled(Vexile, {
  flex: 1,
  overflow: 'auto',
  padding: '0 3rem',
});
export const MainWrapper = styled('table', {
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
  '& > thead': {
    color: '#ffffff',
    fontWeight: 600,
    textAlign: 'center',
    borderBottom: '1px solid #ffffff',
    position: 'sticky',
    top: '-1px',
    background: '#343434',
  },
  '& td': {
    padding: '1rem 3rem',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  '& > tbody td:hover': {
    background: '#ffffff2f',
  },
});

export const Footer = styled(Hexile, {
  overflowX: 'auto',
});
export const PageBtn = styled(Hexile, {
  color: '#f9f9f9',
  borderRadius: '2rem',
  cursor: 'pointer',
  width: '5rem',
  height: '5rem',
  '&.current': {
    background: '#d0d0d0',
    color: '#393939',
    fontWeight: 600,
  },
  '&.no:hover': {
    background: '#ffffff33',
  },
});
