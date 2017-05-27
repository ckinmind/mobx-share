import React from 'react'
import {observable, action, computed, extendObservable, toJS, isObservable} from 'mobx'
import {observer, Observer} from 'mobx-react'
import Markdown from '../../markdown'
import { Table, Button} from 'antd';

let info = `

参考资料：
- [Is autorun equivalent to componentWillReact?](https://github.com/mobxjs/mobx-react/issues/62)
- [autorun](http://cn.mobx.js.org/refguide/autorun.html)
\`\`\`js

componentDidMount(){
       this.disposer =  autorun(() => {
            if (this.isError) {
                notification.error({message: '有错误', description: '这是错误提示'});
            }
        });

       this.disposer2 =  when(
          () => !this.isError,
          () => {
              notification.success({message: '没有错误', description: '没有错误'});
          }
        );
    }
    componentWillUnmount(){
         this.disposer();
         this.disposer2();
    }
    
\`\`\`

`;



class Q1 extends React.Component {


    render() {

        return (
          <div>
              <h1>Q1: 关于清理autorun观察</h1>
              <Markdown source={info} />
          </div>
        );
    }
}

export default Q1;
