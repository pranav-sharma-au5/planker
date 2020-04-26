import React, { useRef, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton, Button, Menu, MenuItem, Card, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector, useDispatch } from "react-redux";
import { getInviteLink } from "../ActionCreators/listActions";
import { login } from "../ActionCreators/boardActions";
import { Link } from "react-router-dom";
import "./Navbar.css"
import useMenu from "../Hooks/useMenu"

const useStyles = makeStyles((theme) => ({

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

}));

export default function Navbar() {
  const classes = useStyles();
  const { board } = useSelector(state => state.appReducer)
  const showInvite = window.location.pathname.includes("boards/")
  const [anchorEl, handleClick, handleClose] = useMenu(null);
  const [copy, setCopy] = useState('Copy');
  const textAreaRef = useRef(null);
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const dispatch = useDispatch()
  if (board) {
    var { id: boardId, invite } = board
  }
  const handleInviteClick = (e) => {
    if (!invite) {
      dispatch(getInviteLink(boardId))

    }
    else {
      console.log(invite)
    }

  }

  const handleMenuClose = () => {
    handleClose()
    setTimeout(() => {
      setCopy("Copy")
      dispatch(getInviteLink("clear"))

    }, 500);
  }

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopy('Copied!');
  };

  const handleLogout = () => {
    dispatch(login())//logging out
  }
  return (
    <div className={classes.root}>
      <AppBar style={{ zIndex: 1201 }} position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link className="planker-navbar" to="/dashboard" >
              Planker
            </Link>
          </Typography>

          {showInvite && <Button onClick={handleClick} variant="contained" color="default" >
            Invite
          </Button>}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem>
              <Card className="invite-card"  >
                <Typography variant="overline" >
                  INVITE TO BOARD
                </Typography>
                <Divider style={{ width: "100%" }} />
                <div className="invite-card-content">
                  {!invite && <Button variant="contained" onClick={handleInviteClick} color="primary" >
                    Create Link
                 </Button>
                  }
                  {
                    invite &&
                    <Typography color="primary" className="invite-link" variant="body1" >
                      {invite}
                      <br />
                      <textarea className="hidden-textarea-invite" ref={textAreaRef} value={invite} ></textarea>
                      <Button onClick={copyToClipboard} size="small" variant="contained" color="secondary" >
                        {copy}
                      </Button>
                    </Typography>
                  }
                </div>


              </Card>

            </MenuItem>
          </Menu>
          {
            isLoggedIn &&
            <Link to="/" >
              <Button className="logout-button" onClick={handleLogout} variant="contained" color="default" >
                Logout
            </Button>
            </Link>
          }
        </Toolbar>

      </AppBar>
    </div>
  );
}
