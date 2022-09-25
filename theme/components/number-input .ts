export const NumberInput = {
  variants: {
    primary: () => ({
      field: {
        background: 'transparent',
        fontSize: '16px',
        fontWeight: '500',
        padding: '22px 14px',
        color: '#fcfcfd',
        border: '2px solid #353945',
        borderRadius: 'xl',
        _placeholder: {
          color: 'textSecondary',
        },
        _focus: {
          borderColor: '#777e90',
        },
        _focusVisible: {
          outline: 'none',
        },
        _invalid: {
          borderColor: '#E53E3E',
        },
      },
      stepper: {
        border: 'none',
      },
    }),
  },
  defaultProps: {
    variant: 'primary',
  },
};
