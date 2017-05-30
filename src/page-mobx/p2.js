import React from 'react'
import {observable, action, autorun, when} from 'mobx'
import {observer, whyRun} from 'mobx-react'
import Markdown from '../markdown'
import './style/p1.styl'
import { Button, notification, Switch } from 'antd'

let info = `

\`\`\`js
\import {observable, action, autorun, when} from 'mobx'

    @observable isError = false;

    @action handleClick = () => {
        this.isError = !this.isError;
    };
    
    componentDidMount(){
        autorun(()=> {
            if (this.isError) {
                notification.error({
                message: '有错误', 
                description: '这是错误提示'
                });
            }
        });
        
        when(
          () => !this.isError,
          () => {
              notification.success({message: '没有错误', description: '没有错误'});
          }
        );
    }
    
    render() {
        return (
          <div>
              <Button onClick={this.handleClick}>操作</Button>
          </div>
        );
    }
\`\`\`

`;


let result = `

\`\`\`js
1. when 满足条件后只执行一次，autorun 满足条件可以可以一直执行
 
2. reaction 函数是 autorun 的变种，粗略地讲，reaction 是 computed(expression).observe(action(sideEffect)) 或 
   autorun(() => action(sideEffect)(expression) 的语法糖

3. 注意 autorun 的清理查看Q1
\`\`\`

`;

@observer
class P2 extends React.Component {

    @observable showResult = false;
    @observable isError = false;


    @action handleClick = () => {
        this.isError = !this.isError;
    };

    componentDidMount(){
        autorun(() => {
            if (this.isError) {
                notification.error({message: '有错误', description: '这是错误提示'});
            }
        });

        when(
          () => !this.isError,
          () => {
              notification.success({message: '没有错误', description: '没有错误'});
          }
        );
    }
    componentWillUnmount(){
        console.log('this is componentWillUnmount');
    }

    render() {
        return (
          <div>
            <Switch defaultChecked={false}  onChange={() => this.showResult = !this.showResult}/>
              <h1 style={{textAlign: 'center'}}>autorun / when / reaction</h1>
              <div id="p2">
              </div>
              <Markdown source={info} />
              <Button onClick={this.handleClick}>autorun测试</Button>
              <Markdown source={result}  show={this.showResult}/>
          </div>
        );
    }
}

export default P2;
