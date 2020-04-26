import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import useInputState from "../Hooks/useInputState";
import { Redirect } from "react-router-dom";
import { signup } from "../ActionCreators/boardActions";
import { Typography, TextField, Button, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

export const Signup = ({ signup, location }) => {
  const [email, setEmail, resetEmail] = useInputState('')
  const [password, setPassword, resetPassword] = useInputState('')
  const [name, setName, resetName] = useInputState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (location.state) {
      var boardToken = location.state.token
    }
    signup(email, password, name, boardToken)
    resetEmail()
    resetPassword()
    resetName()
  }

  const isLoggedIn = localStorage.getItem('isLoggedIn')



  if (isLoggedIn) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="login-container" >
      <Paper className="form-container" >

        <Typography variant="h6" >
          Signup
          </Typography>
        <form className="login-form" onSubmit={handleSubmit} >
          <div className="input-group">

            <TextField fullWidth inputProps={{ type: "text" }} onChange={setName} value={name} label="Name" variant="outlined" />
          </div>
          <div className="input-group" >
            <TextField fullWidth onChange={setEmail} value={email} label="Email" variant="outlined" />
          </div>
          <div className="input-group">

            <TextField fullWidth inputProps={{ type: "password" }} onChange={setPassword} value={password} label="Password" variant="outlined" />
          </div>
          <div className="submit-container">
            <Button variant="contained" type="submit" color="primary"  >
              Signup
              </Button>
          </div>
          <Typography variant="overline" >
            Already a member? <Link to="/" > Login</Link>
          </Typography>


        </form>
      </Paper>
    </div>
  )
}

const mapStateToProps = ({ homeReducer }) => ({
  homeReducer
})



export default connect(mapStateToProps, { signup })(Signup)
