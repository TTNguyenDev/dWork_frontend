import { StyleConfig } from '@chakra-ui/theme-tools';

export const Modal: StyleConfig = {
  baseStyle: {
    dialog: {
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '2xl',
      bg: 'rgba(150, 150, 150, 0.1)',
      backdropFilter: 'auto',
      backdropBlur: '100px',
    },
    closeButton: {
      color: '#8F8F8F',
      _focus: { boxShadow: 'none' },
    },
  },
};
