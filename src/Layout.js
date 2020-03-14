import React from 'react';

import { layoutStyles, theme, drawerWidth} from './theme/Styles';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import List from './components/List';
import Edit from './components/Edit';
import {Switch,Route} from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://bluesteelcrm.com/">
				Blue Steel CRM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



function Layout(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Sidebar
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Sidebar PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <AppHeader onDrawerToggle={handleDrawerToggle} />
					<main className={classes.main}>
		    		<Switch>
							<Route path='/obj/:object/edit/:id'><Edit/></Route>
							<Route path='/obj/:object/edit'><Edit/></Route>
							<Route path='/obj/:object'><List/></Route>
						</Switch>
					</main>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default withStyles(layoutStyles)(Layout);
