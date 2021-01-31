import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/general.css'
import Layout from '../components/Layout'
import NotFound from '../pages/NotFound'
import Dashboard from '../pages/Dashboard'
import Configuration from '../pages/Configuration'
import Login from '../pages/Login'

function App () {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/dashboard/:socketId' component={Dashboard} />
          <Route exact path='/configuration' component={Configuration} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/notfound' component={NotFound} />
          <Redirect exact from='/' to='/dashboard' />
          <Redirect to='/notfound' />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App
