import React, { useState } from "react";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import MainAppBar from './components/MainAppBar';
import Routes from './components/Routes';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  spacing: 8,
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '23ch',
  },
  list: {
    width: 250,
  },
  link: {
    textDecoration: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  footer: {
    display: 'flex',
    marginTop: 'calc(5% + 75px)',
    bottom: 0,
    width: '100% !important',
    height: '60px !important',
    textAlign: 'center',
    backgroundColor: '#cfd8dc'
  },
  footerText: {
    margin: 'auto'
  },
  column: {
    flexBasis: '50%',
  },
  articleContainer: {
    paddingTop: '50px',
    width: '60%',
    margin: 'auto',
  },
  articleBody: {
    padding: '25px 0px 50px 0px',
  },
  info: {
    padding: '20px',
    minHeight: '100px',
    wordWrap: 'break-word'
  },
  calculator: {
    padding: '20px 0px 0px 0px',
  }
}));

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkState, setDarkState] = useState(!prefersDarkMode);

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkState ? "dark" : "light",
          primary: {
            light: '#ffffff',
            main: '#cfd8dc',
            dark: '#9ea7aa',
            contrastText: '#000000'
          },
          secondary: {
            light: '#819ca9',
            main: '#546e7a',
            dark: '#29434e',
            contrastText: '#ffffff'
          },
        },
      }),
    [darkState],
  );

  const classes = useStyles(theme);

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <MainAppBar classes={classes} handleThemeChange={handleThemeChange} darkState={darkState} />
        <Switch>
          {Routes.map((route) => (
            <Route exact path={route.path} key={route.path}>
              <route.component classes={classes} />
            </Route>
          ))}
        </Switch>
        <div className={classes.footer}>
          <Typography variant="title" className={classes.footerText}>
            "Personal Finance is Personal"
        </Typography>
        </div>
      </div>
    </ThemeProvider>
    </BrowserRouter>
  );
}