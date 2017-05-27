import React from 'react'
import {observable, action,computed} from 'mobx'
import {observer} from 'mobx-react'
import Markdown from '../markdown'
import './p1.scss'
import { Button, notification } from 'antd';
import store3 from './store3'

let info = `
参考资料：[It is not possible to assign a new value to a computed](https://github.com/mobxjs/mobx/issues/626)

\`\`\`js
import {observable, action,computed} from 'mobx'

class store {

    @observable num = 8;

    @computed get price(){
        return this.num * 100;
    }
}

@observer
class App extends React.Component {

    @action handleClick = () => {
        store.num = Math.random();
    };

    render() {
        return (
          <div>
              <Button onClick={this.handleClick}>computed测试</Button>
              <h1>衬衫的价格是:  {store.price}</h1>
          </div>
        );
    }
}
\`\`\`

`;




@observer
class P3 extends React.Component {

    @action handleClick = () => {
        store3.num = Math.random();
    };

    render() {
        return (
          <div>
              <h1 style={{textAlign: 'center'}}>@computed</h1>
              <div id="p3">
              </div>
              <Markdown source={info} />
              <Button onClick={this.handleClick}>computed测试</Button>
              <h1>衬衫的价格是:  {store3.price}</h1>
          </div>
        );
    }
}

export default P3;
