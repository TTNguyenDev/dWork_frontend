export const Button = {
  variants: {
    connectWallet: () => ({
      padding: '25px',
      background: '#202632',
      fontSize: '16px',
      fontWeight: '700',
      transition: 'all 0.2s',
      textColor: 'white',
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
    }),
    primary: () => ({
      padding: '25px',
      background: 'linear-gradient(207.67deg, #FDAE8F 3.43%, #FD1C68 104.7%)',
      fontSize: '16px',
      fontWeight: '700',
      transition: 'all 0.2s',
      textColor: 'white',
      borderRadius: 'xl',
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
    }),
    ghost: () => ({
      borderRadius: '3xl',
    }),
  },
  defaultProps: {
    variant: 'primary',
  },
};
