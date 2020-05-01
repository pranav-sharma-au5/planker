import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import useInputState from "../Hooks/useInputState";
import { Redirect } from "react-router-dom";
import { login } from "../ActionCreators/boardActions";
import { Typography, TextField, Button, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Login.css";




const Login = ({ login, location }) => {
  const [email, setEmail, resetEmail] = useInputState('')
  const [password, setPassword, resetPassword] = useInputState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (location.state) {
      var boardToken = location.state.token
    }
    login(email, password, boardToken)
    resetEmail()
    resetPassword()
  }

  const isLoggedIn = localStorage.getItem('isLoggedIn')



  if (isLoggedIn) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="login-container" >
      <Paper className="form-container" >

        <Typography variant="h6" >
          Login
        </Typography>
        <form className="login-form" onSubmit={handleSubmit} >
          <div className="input-group" >
            <TextField fullWidth inputProps={{ type: "email", required: true }} onChange={setEmail} value={email} label="Email" variant="outlined" />
          </div>
          <div className="input-group">

            <TextField fullWidth inputProps={{ type: "password", required: true }} onChange={setPassword} value={password} label="Password" variant="outlined" />
          </div>
          <div className="submit-container">
            <Button variant="contained" type="submit" color="primary"  >
              Login
            </Button>
          </div>
          <Typography variant="overline" >
            Not a member? <Link to="/signup" > Signup now!</Link>
          </Typography>


        </form>
      </Paper>

    </div>


  )
}

const mapStateToProps = ({ homeReducer }) => ({
  homeReducer
})



export default connect(mapStateToProps, { login })(Login)
