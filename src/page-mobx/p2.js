import React from 'react'
import {observable, action, autorun, when} from 'mobx'
import {observer, whyRun} from 'mobx-react'
import Markdown from '../markdown'
import './p1.scss'
import { Button, notification } from 'antd';


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

@observer
class P2 extends React.Component {


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
              <h1 style={{textAlign: 'center'}}>autorun / when</h1>
              <div id="p2">
              </div>
              <Markdown source={info} />
              <Button onClick={this.handleClick}>autorun测试</Button>
          </div>
        );
    }
}

export default P2;
