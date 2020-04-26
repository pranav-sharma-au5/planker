import React from 'react'
import { Redirect, Link } from "react-router-dom";
import { checkToken } from "../ActionCreators/boardActions";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Typography } from "@material-ui/core";

export default function Invite({ match }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const token = match.params.token
  const { tokenVerified } = useSelector(state => state.homeReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(checkToken(token))
    }

  }, [isLoggedIn])

  if (tokenVerified) {
    return (
      <Redirect to="/dashboard" />
    )
  }


  return (
    <div className="invite-background">
      <div style={{ marginBottom: "3rem" }} className="col">
        <div className="row justify-content-center">
          <img height="100px" src="https://res.cloudinary.com/dfu8kqztl/image/upload/v1587880296/planker/planker-png-logo_hadcjf.png" alt="" />

        </div>
        <div style={{ paddingTop: "3rem" }} >
          <Typography variant="h5" gutterBottom align="center" color="primary" > Planker </Typography>

        </div>
        <div>

          <Link to={{ pathname: "/", state: { token } }}>
            <Button variant="contained" style={{ margin: "2rem 2rem 6rem 2rem" }} size="large" color="primary" >
              Login
       </Button>
          </Link>
          <Link to={{ pathname: "/signup", state: { token } }}>
            <Button variant="contained" style={{ margin: "2rem 2rem 6rem 2rem" }} size="large" color="primary">
              Signup

        </Button>
          </Link>
        </div>
      </div>

    </div>
  )
}
