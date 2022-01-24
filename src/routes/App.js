import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/general.css'
import Layout from '../components/Layout'
import ConfigureBotRoute from '../components/configurebot/ConfigureBotRoute'
import NotFound from '../pages/NotFound'
import Dashboard from '../pages/Dashboard'
import Configuration from '../pages/Configuration'
import Masterlist from '../pages/Masterlist'
import Chests from '../pages/Chests'

function App () {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/configuration' component={Configuration} />
          <Route exact path='/masterlist' component={Masterlist} />
          <Route exact path='/chests' component={Chests} />
          <Route path='/configurebot' component={ConfigureBotRoute} />
          <Redirect exact from='/' to='/dashboard' />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App
