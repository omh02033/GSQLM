import { Vexile } from '@/components';
import { styled } from '@/stitches.config';

export const Wrapper = styled('form', {
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Input = styled('input', {
  background: '#00000000',
  padding: '2rem',
  transition: 'all .2s ease',
  color: '#fff',
  width: '70%',
  outline: 'none',
  border: 'none',
  borderBottom: '1px solid #662aac',
  '&:focus': {
    borderBottom: '2px solid #8944ba',
  },
  '&:placeholder': {
    color: '#c8c8c8',
  },
});

export const Submit = styled('input', {
  borderRadius: '1rem',
  border: 'none',
  outline: 'none',
  background: 'linear-gradient(to top, #5929a0, #6734b2)',
  color: '#fff',
  fontWeight: 700,
  padding: '2rem 5rem',
  cursor: 'pointer',
  '&:disabled': {
    background: 'linear-gradient(to top, #6a6a6a, #737373)',
    cursor: 'not-allowed'
  }
});
