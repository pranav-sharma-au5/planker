import React, { } from 'react'
import { connect } from 'react-redux'
import './App.css';
import { Home } from "./Components";
export const App = () => {
    return (

        <Home />
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
