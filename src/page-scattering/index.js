import './scattering.styl'

import Scattering from './scattering'
import ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'

ReactDOM.render(
  <div>
    {__DEV__ && <DevTools />}
    <Scattering/>
  </div>,
  document.getElementById('root')
)
