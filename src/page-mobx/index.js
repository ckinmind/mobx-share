import './mobx.styl'

import Mobx from './mobx'
import ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'

ReactDOM.render(
  <div>
    {__DEV__ && <DevTools />}
    <Mobx/>
  </div>,
  document.getElementById('root')
)
