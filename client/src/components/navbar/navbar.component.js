import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {fade} from "@material-ui/core";
import articleData from "../../data/articleData";




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
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Navbar() {

  const classes = useStyles();

  /* Create hook for the query*/
  const [query, setQuery] = React.useState(null);
  const onChange = (event) => setQuery(event.target.value)




  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {/*
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>


          <Typography variant="h6" className={classes.title}>
            <Link to="/fdsa" className={classes.title}>
              {query}
            </Link>
          </Typography>
          */}
          




          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.title}>
              Home
            </Link>
          </Typography>


          {/*
          loop over all the articles exclusing the home and search as these have unique properties
          */}
          <div>
            {
              articleData.articles.map((item) => {
                if((item.path !== "/") && (item.path !==  "/search")){
                  return (
                    <Link to={item.path} className={classes.menuItem}>
                      <Button color="inherit">
                        {item.navbarTitle}
                      </Button>
                    </Link>
                  )
                }

              })
            }
          </div>


          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Link to="/search">
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={onChange}
              />
            </Link>

          </div>



          <Link to={articleData.about.path} className={classes.menuItem}>
            <Button color="inherit">
              {articleData.about.navbarTitle}
            </Button>
          </Link>

        </Toolbar>
      </AppBar>
    </div>
  );

}

export default Navbar;