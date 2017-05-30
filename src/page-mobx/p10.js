import React from 'react'
import {observable, action,computed} from 'mobx'
import {observer} from 'mobx-react'
import Markdown from '../markdown'

let info = `

注意: 如果是异步请求，在请求的回调中需要改变observable的变量，必须在回调的外层包一层action函数，才能触发更新
\`\`\`js
import {action } from 'mobx'

fetch('xxxx')
   .then(action(res => {      
      // 成功操作，可能会改变observable的值，从而触发更新，必须外边包一层action函数
   })).catch(action(err => {
      // 错误回调， 如果有改变observable值的操作，也需要外边包一层action函数    
   }));
\`\`\`

如果使用 async / await, 需要使用runInAction
\`\`\`js
import {runInAction } from 'mobx'

 @observable data = ''

 async initData() {
  
    let content = await fetch('xxxx')

    runInAction(() => {
      this.data = content.data
    })
  }
\`\`\`

`;


@observer
class P10 extends React.Component {

  render() {
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>action / runInAction </h1>
        <Markdown source={info} />
      </div>
    );
  }
}

export default P10;
