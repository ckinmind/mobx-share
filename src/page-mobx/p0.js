import React from 'react'
import {observable, action, computed, extendObservable, toJS, isObservable} from 'mobx'
import {observer} from 'mobx-react'
import Markdown from '../markdown'
import { Table, Button} from 'antd';


let info = `

\`\`\`js
maps
\`\`\`

`;


@observer
class P0 extends React.Component {


    render() {

        return (
          <div>
              <h1 style={{textAlign: 'center',fontSize:'40px',marginTop: '400px'}}>MobX分享</h1>
              <div id="p4">
              </div>
          </div>
        );
    }
}

export default P0;
