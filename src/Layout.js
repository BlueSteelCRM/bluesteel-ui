import React,{useContext} from 'react';
import clsx from 'clsx';
import { layoutStyles, theme, drawerWidth} from './theme/Styles';
import { ThemeProvider } from '@material-ui/core/styles';
import {SchemaProvider,SchemaContext} from './SchemaContext';
import {CustomLayoutProvider} from './CustomLayoutContext';
import { SnackbarProvider } from 'notistack';

import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import Icons from './icons';
import List from './components/List';
import Edit from './components/Edit';
import Home from './layouts/Home';
import {Switch,Route} from 'react-router-dom';
import JSONPretty from 'react-json-pretty';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://steamengine.io/">
				SteamEngine.io CRM
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

export default function Layout(props) {
  const classes = layoutStyles();
	const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
	let width=document.body.clientWidth;
  const [drawerOpen, setDrawerOpen] = React.useState(width>1000);


  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <ThemeProvider theme={theme}>
		<SchemaProvider>
		<CustomLayoutProvider>
			<SnackbarProvider>
			<CssBaseline />
			{isSmall &&
					<Sidebar
						PaperProps={{ style: { width: drawerWidth } }}
						variant="temporary"
						open={drawerOpen}
						onClose={handleDrawerToggle}
					/>
			}
				<div className={classes.root}>
							{!isSmall &&
								<Drawer
					        className={classes.drawer}
					        variant="persistent"
					        anchor="left"
					        open={drawerOpen}
					        classes={{
					          paper: classes.drawerPaper,
					        }}
					      >
			            <Sidebar PaperProps={{ style: { width: drawerWidth } }} />
								</Drawer>
							}
							<div className={clsx(classes.content, {
							          [classes.contentShift]: drawerOpen,
												[classes.contentIsSmall]:isSmall
							        })}
							>
							<AppHeader onDrawerToggle={handleDrawerToggle} />
							<main className={classes.main}>
					    		<Switch>
										<Route path='/icons'><Icons/></Route>
										<Route path='/schema'><SchemaDisplay/></Route>
										<Route path='/obj/:object/edit'><Edit isNew/></Route>
										<Route path='/obj/:object/:id'><Edit/></Route>
										<Route path='/obj/:object'><List/></Route>
										<Route path='/'><Home/></Route>
									</Switch>
							</main>
		          <footer className={classes.footer}>
		            <Copyright />
		          </footer>
		        </div>
		      </div>
				</SnackbarProvider>
				</CustomLayoutProvider>
			</SchemaProvider>
    </ThemeProvider>
  );
}
