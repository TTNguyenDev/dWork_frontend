import { Input } from './input';

export const NumberInput = {
  variants: {
    primary: () => ({
      field: {
        ...Input.variants.primary().field,
        _focusVisible: {
          outline: 'none',
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
