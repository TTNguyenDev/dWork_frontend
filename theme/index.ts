import { extendTheme } from '@chakra-ui/react';
import { styles } from './styles';
import { config } from './config';
import { semanticTokens } from './semanticTokens';
import { components } from './components';

export const theme = extendTheme({
  config,
  styles,
  semanticTokens,
  components,
});
