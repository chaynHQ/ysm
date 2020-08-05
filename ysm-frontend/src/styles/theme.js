import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1D2445',
      contrastText: '#FFF5F0',
    },
    secondary: {
      main: '#FFF5F0',
      contrastText: '#1D2445',
    },
    error: {
      main: '#EEB15C',
      contrastText: '#1D2445',
    },
    warning: {
      main: '#D44A6A',
      contrastText: '#1D2445',
    },
    info: {
      main: '#EFA78E',
      contrastText: '#1D2445',
    },
    success: {
      main: '#8BD4BE',
      contrastText: '#1D2445',
    },
  },
  typography: {
    fontFamily: 'Nunito',
    body1: {
      fontSize: 18,
    },
    body2: {
      fontSize: 18,
      color: '#FFF5F0',
    },
    subtitle1: {
      fontSize: 14,
    },
    subtitle2: {
      fontSize: 14,
      color: '#FFF5F0',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 16,
        borderRadius: 0,
      },
    },
    MuiIconButton: {
      root: {
        color: '#000000',
        width: 32,
        height: 32,
        fontSize: 22,
        lineHeight: 26,
      },
    },
    MuiTypography: {
      root: {
        marginBottom: 16,
        paddingLeft: '1rem',
        paddingRight: '1rem',
      },
      colorTextPrimary: {
        color: '#1D2445',
      },
      colorTextSecondary: {
        color: '#FFF5F0',
      },
    },
  },
});

export default Theme;
