import './partition.styl'

import Partition from './partition'
import ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'

ReactDOM.render(
  <div>
    {__DEV__ && <DevTools />}
    <Partition/>
  </div>,
  document.getElementById('root')
)
