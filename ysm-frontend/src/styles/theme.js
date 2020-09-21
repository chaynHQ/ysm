import { createMuiTheme } from '@material-ui/core/styles';

// TODO:
// Once colours are settled upon remove Hex codes from within the components & transfer into here
const Theme = createMuiTheme({
  palette: {
    primary: {
      light: '#F7E3D7',
      main: '#F9C8B0',
      dark: '#FD9E8C',
      // #EFE9E5
      // #FEF6F1
    },
    secondary: {
      light: '#717798',
      main: '#3A4167',
      dark: '#242A4A',
      // #E2E3E6
    },
    error: {
      main: '#EC836F',
    },
    info: {
      main: '#A8B5F8',
    },
    warning: {
      main: '#4D4D4D',
      light: '#898989',
      dark: '#000000',
      // #CDCDCD
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
      fontSize: 16,
      fontWeight: 700,
      color: '#3A4167',
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
        color: '#717798',
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
    MuiInputBase: {
      root: {
        borderRadius: 6,
      },
      input: {
        backgroundColor: '#FFF',
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: '#DADDED',
      },
    },
  },
});

export default Theme;
