import { createMuiTheme } from '@material-ui/core/styles';

let themeCore = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

export const theme=Object.assign(themeCore,{overrides:{
	MuiDrawer: {
		paper: {
			backgroundColor: '#18202c',
		},
	},
	MuiButton: {
		label: {
			textTransform: 'none',
		},
		contained: {
			boxShadow: 'none',
			'&:active': {
				boxShadow: 'none',
			},
		},
	},
	MuiTabs: {
		root: {
			marginLeft: themeCore.spacing(1),
		},
		indicator: {
			height: 3,
			borderTopLeftRadius: 3,
			borderTopRightRadius: 3,
			backgroundColor: themeCore.palette.common.white,
		},
	},
	MuiTab: {
		root: {
			textTransform: 'none',
			margin: '0 16px',
			minWidth: 0,
			padding: 0,
			[themeCore.breakpoints.up('md')]: {
				padding: 0,
				minWidth: 0,
			},
		},
    wrapper: {
      flexDirection:'row',
			alignItems: 'normal'
    },
		labelIcon:{
			minHeight:'auto',
			padding:'4px 8px'
		}
	},
	MuiIconButton: {
		root: {
			padding: themeCore.spacing(1),
		},
	},
	MuiTooltip: {
		tooltip: {
			borderRadius: 4,
		},
	},
	MuiDivider: {
		root: {
			backgroundColor: '#404854',
		},
	},
	MuiListItemText: {
		primary: {
			fontWeight: themeCore.typography.fontWeightMedium,
		},
	},
	MuiListItemIcon: {
		root: {
			color: 'inherit',
			marginRight: 0,
			'& svg': {
				fontSize: 20,
			},
		},
	},
	MuiAvatar: {
		root: {
			width: 32,
			height: 32,
		},
	}
}});


export const drawerWidth = 235;

export const layoutStyles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
		flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#eaeff1'
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
};


export const sidebarStyles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

const lightColor = 'rgba(255, 255, 255, 0.7)';

export const headerStyles = theme => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

export const commonStyles = theme => ({
  paper: {
    //maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addObject: {
    marginRight: theme.spacing(1),
  },
	contentWrapper: {
		flex: 1,
    margin: '8px 8px',
		padding: 0
  }
});
