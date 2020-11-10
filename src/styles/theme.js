import { createMuiTheme } from '@material-ui/core/styles';

// TODO:
// Once colours are settled upon remove Hex codes from within the components & transfer into here
const Theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FEF6F1', // main background
      main: '#F7E3D7',
      dark: '#F9C8B0',
      contrastText: '#242A4A', // Main Text
      // #EFE9E5
      // #FD9E8C
    },
    secondary: {
      light: '#E2E3E6',
      main: '#3A4167',
      dark: '#242A4A', // header text
      // #E2E3E6
    },
    error: {
      main: '#EC836F',
    },
    info: {
      main: '#E2E3E6', // Static Pages header card background colour
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
      color: '#242A4A',
    },
    h2: {
      fontSize: 16,
      fontWeight: 700,
      color: '#242A4A',
    },
    h6: {
      lineHeight: 18,
    },
    body1: {
      fontSize: 16,
      color: '#717798',
    },
    body2: {
      fontSize: 16,
      color: '#242A4A',
    },
    subtitle1: {
      fontSize: 14,
    },
    subtitle2: {
      fontSize: 14,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 6,
      },
      label: {
        fontWeight: 900,
        textTransform: 'none',
      },
      outlined: {
        borderRadius: 34,
        fontSize: 12,
      },
      outlinedSecondary: {
        color: '#717798',
        borderColor: '#717798',

      },
      outlinedSizeSmall: {
        fontSize: 12,
      },
    },
    MuiIconButton: {
      root: {
        width: 20,
        height: 20,
        fontSize: 22,
        lineHeight: 26,
      },
    },
    MuiTypography: {
      root: {
        marginBottom: 16,
      },
      colorTextPrimary: {
        color: '#717798', // Body Text
      },
      colorTextSecondary: {
        color: '#242A4A', // Header Text & some body text
      },
    },
    MuiBottomNavigation: {
      root: {
        backgroundColor: '#FEF6F1',
        alignItems: 'flex-start',
        height: '100%',
        padding: 8,
      },
    },
    MuiBottomNavigationAction: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 12,
        paddingLeft: 12,
        '&$selected': {
          paddingTop: 0,
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
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 120,
      },
      notchedOutline: {
        borderColor: '#DADDED',
      },
    },
    MuiCard: {
      root: {
        margin: 6,
        borderRadius: 6,
      },
    },
    MuiDialog: {
      paper: {
        padding: 20,
        borderRadius: 6,
        backgroundColor: '#FCEFE5',
      },
    },
  },

});

export default Theme;
