import ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'
import Route from './routes'
import './style/app.styl'

ReactDOM.render(
  <div>
    {__DEV__ && <DevTools />}
    {/*<Cluster/>*/}
      <Route />
  </div>,
  document.getElementById('root')
)
