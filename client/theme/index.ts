import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

//foundations
import { colors } from './foundations/colors';

//components
import { Button } from './components/button';
import Steps from './components/Steps';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const overrides = {
  config,
  colors,
  components: {
    Button,
    Steps,
  },
};

export const theme = extendTheme(overrides);
