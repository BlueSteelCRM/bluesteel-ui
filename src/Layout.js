import React,{useContext} from 'react';

import { layoutStyles, theme, drawerWidth} from './theme/Styles';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import {SchemaProvider,SchemaContext} from './SchemaContext';
import {CustomLayoutProvider} from './CustomLayoutContext';
import { SnackbarProvider } from 'notistack';

import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import List from './components/List';
import Edit from './components/Edit';
import {Switch,Route} from 'react-router-dom';
import JSONPretty from 'react-json-pretty';

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
function SchemaDisplay(){
	let schema=useContext(SchemaContext);
	return <JSONPretty id="schema-json" data={schema}/>
}



function Layout(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <ThemeProvider theme={theme}>
			<SnackbarProvider>

	      <div className={classes.root}>
	        <CssBaseline />
	        <nav className={classes.drawer}>
	          <Hidden smUp implementation="js">
							<SchemaProvider>
		            <Sidebar
		              PaperProps={{ style: { width: drawerWidth } }}
		              variant="temporary"
		              open={mobileOpen}
		              onClose={handleDrawerToggle}
		            />
							</SchemaProvider>
	          </Hidden>
	          <Hidden xsDown implementation="css">
	            <Sidebar PaperProps={{ style: { width: drawerWidth } }} />
	          </Hidden>
	        </nav>
	        <div className={classes.app}>
	          <AppHeader onDrawerToggle={handleDrawerToggle} />
						<main className={classes.main}>
							<SchemaProvider>
							<CustomLayoutProvider>
				    		<Switch>
									<Route path='/schema'><SchemaDisplay/></Route>
									<Route path='/obj/:object/:id'><Edit/></Route>
									<Route path='/obj/:object/edit/:id'><Edit/></Route>
									<Route path='/obj/:object/edit'><Edit/></Route>
									<Route path='/obj/:object'><List/></Route>
								</Switch>
								</CustomLayoutProvider>
							</SchemaProvider>
						</main>
	          <footer className={classes.footer}>
	            <Copyright />
	          </footer>
	        </div>
	      </div>
			</SnackbarProvider>
    </ThemeProvider>
  );
}

export default withStyles(layoutStyles)(Layout);
