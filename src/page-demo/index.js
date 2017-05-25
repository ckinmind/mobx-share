import './demo.styl'

import Demo from './demo'
import ReactDOM from 'react-dom'
import mobx from 'mobx'
import DevTools from 'mobx-react-devtools'

mobx.useStrict(true)

ReactDOM.render(
    <div>
        {__DEV__ && <DevTools />}
        <Demo/>
    </div>,
    document.getElementById('root')
)
