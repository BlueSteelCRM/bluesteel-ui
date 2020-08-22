import { createMuiTheme,makeStyles } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#0D47A1' },
  secondary: { main: '#F57C00' }
};
const themeName = 'Tory Blue Gold Drop Chicken';

let themeCore = createMuiTheme({palette,themeName
  /*palette: {
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
  },*/
});

export const theme=Object.assign(themeCore,{overrides:{
/*
	MuiDrawer: {
		paper: {
			backgroundColor: '#18202c',
		},
	},
	MuiCardHeader: {
		root:{
			backgroundColor:themeCore.palette.primary.main,
    	color: themeCore.palette.common.white,
		}
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
	}*/
} });


export const drawerWidth = 235;

export const layoutStyles = makeStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
	drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
		flex:1,
		flexDirection:"column",
		display:"flex",
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
	contentIsSmall: {
		marginLeft: 0,
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
});


export const sidebarStyles = makeStyles(theme => ({

  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    //color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    //color: 'rgba(255, 255, 255, 0.7)',
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
    //color: '#4fc3f7',
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
}));

const lightColor = 'rgba(255, 255, 255, 0.7)';

export const headerStyles = makeStyles(theme => ({
	/*
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
	*/
}));

export const commonStyles = makeStyles(theme => ({
	/*
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
	*/
}));
