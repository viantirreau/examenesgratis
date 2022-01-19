import { createTheme } from '@mui/material';

const palette = {
  primary: {
    main: `#6F7475`,
    light: `#E9F2F5`,
  },
};

const theme = createTheme({
  palette: palette,
  // typography: {
  //     fontFamily: `Nunito Sans`,
  // },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: `100px`,
          textTransform: `none`,
        },
        outlined: {
          borderColor: `primary.light`,
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          border: `2px solid ${palette.primary.light}`,
          '&:hover': {
            backgroundColor: palette.primary.light,
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default theme;
