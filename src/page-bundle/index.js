import './bundle.styl'

import Bundle from './bundle'
import ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'

ReactDOM.render(
  <div>
    {__DEV__ && <DevTools />}
    <Bundle/>
  </div>,
  document.getElementById('root')
)
