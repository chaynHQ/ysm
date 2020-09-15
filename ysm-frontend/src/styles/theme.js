import { createMuiTheme } from '@material-ui/core/styles';

// TODO:
// Once colours are settled upon remove Hex codes from within the components & transfer into here
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
      main: '#E2E3E6',
      contrastText: '#1D2445',
    },
    success: {
      main: '#8BD4BE',
      contrastText: '#1D2445',
    },
  },
  typography: {
    fontFamily: 'Nunito',
    fontSize: 16,
    h1: {
      fontSize: 22,
      fontWeight: 700,
    },
    h2: {
      fontSize: 17,
      fontWeight: 700,
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 16,
      color: '#FFF5F0',
    },
    subtitle1: {
      fontSize: 14,
      color: '#717798',
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
        borderRadius: 6,
      },
      label: {
        fontWeight: 900,
        textTransform: 'none',
      },
    },
    MuiIconButton: {
      root: {
        color: '#000000',
        width: 20,
        height: 20,
        fontSize: 22,
        lineHeight: 26,
      },
    },
    MuiTypography: {
      root: {
        marginBottom: 16,
        color: '#242A4A',
      },
      colorTextPrimary: {
        color: '#1D2445',
      },
      colorTextSecondary: {
        color: '#FFFFFF',
      },
    },
    MuiBottomNavigation: {
      root: {
        backgroundColor: '#EFE9E5',
        alignItems: 'flex-start',
        height: '100%',

      },
    },
    MuiBottomNavigationAction: {
      root: {
        '&$selected': {
          color: '#D27200',
        },
      },
      label: {
        fontSize: 12,
        textAlign: 'center',
        '&$selected': {
          fontSize: 12,
        },
      },
    },
    MuiSvgIcon: {
      root: {
        height: 22,
        width: 22,
        color: '#717798',
      },
    },
    MuiBreadcrumbs: {
      li: {
        fontSize: 14,
        color: '#D27200',
      },
    },
    MuiDrawer: {
      paper: {
        backgroundColor: '#FFF5F0',
        minWidth: '50%',
      },
    },
    MuiLink: {
      root: {
        fontSize: 15,
      },
    },
  },
});

export default Theme;
