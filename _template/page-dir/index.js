import './<%component-name%>.styl'

import <%ComponentName%> from './<%component-name%>'
import ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'

ReactDOM.render(
  <div>
    {__DEV__ && <DevTools />}
    <<%ComponentName%>/>
  </div>,
  document.getElementById('root')
)
