import React from "react";
import { NavLink, withRouter } from 'react-router-dom';
import Routes from './Routes';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Switch from "@material-ui/core/Switch";

const MainAppBar = (props) => {
  const classes = props.classes;
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const activeRoute = (routeName) => {
    return props.location.pathname === routeName ? true : false;
  }

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleDrawer(anchor, false)}>
          {<ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      {Routes.map((prop, key) => {
        return (
          <NavLink to={prop.path} activeStyle={{ textDecoration: 'none', color: props.darkState ? 'white' : 'black' }} style={{ textDecoration: 'none', color: props.darkState ? 'white' : 'black' }} key={key}>
            <ListItem button selected={activeRoute(prop.path)} >
              <ListItemIcon>{key % 2 === 0 ? <HomeIcon /> : <AccountBalanceIcon />}</ListItemIcon>
              <ListItemText primary={prop.sidebarName} />
            </ListItem >
          </NavLink>
        );
      })}
      <Divider />
      <List>
        <ListItem button key={"NightMode"}>
          <ListItemIcon><Brightness4Icon /></ListItemIcon>
          <ListItemText primary={"Night Mode"} />
          <Switch checked={props.darkState} onChange={props.handleThemeChange} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="static">
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Personal Finance
          </Typography>

        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
        {list("left")}
      </Drawer>
    </div>
  );
}

export default withRouter(MainAppBar);