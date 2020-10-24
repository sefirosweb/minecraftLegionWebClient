import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/general.css'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/dashboard/:socketId' component={Dashboard} />
          <Route path='/notfound' component={NotFound} />
          <Redirect exact from='/' to='/dashboard' />
          <Redirect to='/notfound' />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App;

