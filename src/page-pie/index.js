import './pie.styl'

import Pie from './pie'
import ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'

ReactDOM.render(
  <div>
    {__DEV__ && <DevTools />}
    <Pie/>
  </div>,
  document.getElementById('root')
)
