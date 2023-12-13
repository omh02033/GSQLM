import { createStitches } from '@stitches/react';

export const COLORS = {
  buttonColor: '#147EFB',
};

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: COLORS,
  },
});
