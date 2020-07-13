import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1D2445',
      contrastText: '#FFF5F0'
    },
    secondary: {
      main: '#D5ECF4',
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
  },
});

export default Theme;