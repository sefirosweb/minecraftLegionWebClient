import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/general.css'
import Layout from '../components/Layout'
import NotFound from '../pages/NotFound'
import Dashboard from '../pages/Dashboard'
import Configuration from '../pages/Configuration'

function App () {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/dashboard/:socketId' component={Dashboard} />
          <Route exact path='/configuration/:socketId' component={Dashboard} />
          <Route exact path='/configuration' component={Configuration} />
          <Redirect exact from='/' to='/dashboard' /> {/* TODO redirect en caso logeado */}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App
