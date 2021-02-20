import { NavLink } from 'react-router-dom'
import RenderBotsOnlineList from './../../components/RenderBotsOnlineList'

const ConfigureBotLayout = (props) => {
  return (
    <div className='row'>
      <div className='col-10'>
        <div className='row'>
          <div className='col-12'>
            <ul className='nav nav-tabs bg-dark'>
              <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/generalconfig'>General Configuration</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/itemstobeready'>Items To Be Ready</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/chests'>Chests</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/combat'>Combat</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/guardjob'>Guard Job</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/minerjob'>Miner Job</NavLink></li>
            </ul>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='card px-5 pt-4 mr-0'>
              {props.children}
            </div>
          </div>
        </div>
      </div>
      <div className='col-2'>
        <RenderBotsOnlineList />
      </div>
    </div>
  )
}

export default ConfigureBotLayout
