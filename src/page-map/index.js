import './map.styl'

import Map from './map'
import ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'

ReactDOM.render(
  <div>
    {__DEV__ && <DevTools />}
    <Map/>
  </div>,
  document.getElementById('root')
)
