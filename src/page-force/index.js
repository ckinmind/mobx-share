import './force.styl'

import Force from './force'
import ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'

ReactDOM.render(
  <div>
    {__DEV__ && <DevTools />}
    <Force/>
  </div>,
  document.getElementById('root')
)
