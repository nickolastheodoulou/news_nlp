import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#FFFFFF',
    textDecoration: 'none',
  },
  menuItem: {
    color: '#FFFFFF',
    textDecoration: 'none',


}
}));

export default function Navbar() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/*
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          */}

          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.title}>
              Home
            </Link>
          </Typography>

          <Button color="inherit">
            <Link to="/finance" className={classes.menuItem}>
              Finance
            </Link>
          </Button>



          <Link to="/bitcoin" className={classes.menuItem}>
            <Button color="inherit">
              Bitcoin
            </Button>
          </Link>



          <Link to="/about" className={classes.menuItem}>
            <Button color="inherit">
              about
            </Button>
          </Link>

        </Toolbar>
      </AppBar>
    </div>
  );

}