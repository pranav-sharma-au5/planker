import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Board, Navbar, Login, SignUp, Invite } from "./index";
import { BrowserRouter, Route } from 'react-router-dom';
import "./Home.css"
import PrivateRoute from "../middlewares/auth";
import Dashboard from "./DashBoard"
import { checkToken } from "../ActionCreators/boardActions";
import { useEffect } from 'react';

export const Home = ({ checkToken }) => {
  const token = window.location.pathname.includes("invite")
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  useEffect(() => {
    if (isLoggedIn && !token) {
      checkToken()
    }

  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/invite/:token" exact component={Invite} />

      <PrivateRoute path="/dashboard" component={Dashboard} />

      <PrivateRoute path="/boards/:boardId/:boardName" component={Board} />

    </BrowserRouter >
  )
}


const mapState = (state) => state

export default connect(mapState, { checkToken })(Home)
