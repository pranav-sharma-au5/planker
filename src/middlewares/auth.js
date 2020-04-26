import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn')


  return (
    <Route
      {...rest}
      render={(props) => isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  )
}
const mapState = (state) => ({ state })

export default connect(mapState, {})(PrivateRoute)