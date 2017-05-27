import React from 'react'
import {observable, action, computed, extendObservable, toJS, isObservable} from 'mobx'
import {observer, Observer} from 'mobx-react'
import Markdown from '../../markdown'
import { Table, Button} from 'antd';

let info = `

\`\`\`js

1. 当一个observable只被一个组件使用时，将这个变量放在组件中，不要放在store中

2. 当有多个组件使用一个observable的变量时，有以下几种方式，去传递使用这个变量

   a. 将这个变量放到store中, 引入该store然后使用
   
   b. 通过props传递到子组件(注意@observer的问题  / 传递原始值和传递对象的问题 / 使用Observer组件的问题)
   
   c. 跨组件传递可以通过Provider / inject 注入
    
\`\`\`

`;


@observer
class Q4 extends React.Component {


    render() {

        return (
          <div>
              <h1>Q4: 关于细粒度拆分 ? </h1>
              <Markdown source={info} />
          </div>
        );
    }
}

export default Q4;
