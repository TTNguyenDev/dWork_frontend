export const reactSelectStyles = {
  chakraStyles: {
    input: (provided: any, state: any) => ({
      ...provided,
      fontSize: '16px',
      fontWeight: '500',
      color: '#fcfcfd',
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      border: '2px solid #353945',
      borderRadius: 'xl',
      cursor: 'pointer',
      boxShadow: 'none !important',
      outline: 'none !important',
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      zIndex: '20',
    }),
  },
  errorBorderColor: '#E53E3E',
  focusBorderColor: '#777e90',
};
