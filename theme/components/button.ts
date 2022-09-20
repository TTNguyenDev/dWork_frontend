export const Button = {
  variants: {
    primary: ({
      borderColor,
      borderWidth = 1,
    }: {
      borderColor: string;
      borderWidth: number;
    }) => ({
      background: 'gradientPrimary',
      borderWidth: '0px',
      height: 'fit-content',
      width: 'fit-content',
      fontSize: '16px',
      fontWeight: '800',
      minW: 'auto',
      transition: 'all 0.2s',
      textColor: '#fff',
      _loading: {
        opacity: 1,
      },
      _hover: {
        background: undefined,
        opacity: 0.8,
        _disabled: {
          opacity: 1,
          background: '',
        },
      },
      _before: {
        content: '" "',
        width: '100%',
        height: '100%',
        position: 'absolute',
        color: '#fff',
      },
      _active: {
        boxShadow: 'none',
      },
      _focus: {
        boxShadow: 'none',
      },
    }),
    secondary: ({
      borderColor,
      borderWidth = 1,
    }: {
      borderColor: string;
      borderWidth: number;
    }) => ({
      background: 'textPrimary',
      borderWidth: '0px',
      height: 'fit-content',
      width: 'fit-content',
      fontSize: '16px',
      fontWeight: '800',
      minW: 'auto',
      transition: 'all 0.2s',
      textColor: '#fff',
      _loading: {
        opacity: 1,
      },
      _hover: {
        background: undefined,
        opacity: 0.8,
        _disabled: {
          opacity: 1,
          background: '',
        },
      },
      _before: {
        content: '" "',
        width: '100%',
        height: '100%',
        position: 'absolute',
        color: '#fff',
      },
      _active: {
        boxShadow: 'none',
      },
      _focus: {
        boxShadow: 'none',
      },
    }),
    accountMenu: () => ({
      minW: 'auto',
      background: 'transparent',
      transition: 'all 0.2s',
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderWidth: '2px',
      textColor: '#FFF',
      fontSize: '16px',
      borderRadius: 0,
      justifyContent: 'start',
      w: '100%',
      _hover: {
        borderImage: 'var(--primary-border-button-color) 1',
      },
      _active: {
        boxShadow: 'none',
      },
      _focus: {
        boxShadow: 'none',
      },
    }),
  },
};
