import {BrowserRouter,Route,Switch} from 'react-router-dom'
import React from 'react'
import Home from './components/Home'
import Signup from './components/Signup'
import Signin from './components/Signin'
export default function Routes () {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
        </Switch>
        </BrowserRouter>
    )
}