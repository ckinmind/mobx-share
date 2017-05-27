import React from 'react'
import {observable, action, computed, extendObservable, toJS, isObservable} from 'mobx'
import {observer, Observer, componentWillReact} from 'mobx-react'
import Markdown from '../markdown'
import { Table, Button, notification, Switch} from 'antd';
import './css/p7.scss'

let info = `
\`\`\`js
import {observable, action} from 'mobx'
import {observer, Observer, componentWillReact} from 'mobx-react'

//@observer
class Test extends React.Component \{

    componentWillReact() {
        notification.info({message: '消息提示', description: 'This is componentWillReact'});
    }
    componentWillReceiveProps(){
        notification.error({message: '消息提示', description: 'This is componentWillReceiveProps'});
    }
     componentDidUpdate(){
        notification.warn({message: '消息提示', description: 'This is Test componentDidUpdate'});
    }
    
    render() {

        return (
          <div className="info-block">
              <div> num1: {this.props.num1}</div>
              <Observer>
                  {() => <div> num2: {this.props.num2}</div>}
              </Observer>
              <div> num3: {this.props.num3.value}</div>
              <Observer>
                  {() => <div> num4: {this.props.num4.value}</div>}
              </Observer>
          </div>
        );
    }
}

//@observer
class App extends React.Component {

    @observable num1 = 1;
    @observable num2 = 1;


    @observable  num3 = {
        value: 1
    };
    @observable  num4 = {
        value: 1
    };

    handleClick = () => {
        this.num1 = Math.random();
        this.num2 = Math.random();

        this.num3.value  =  Math.random();
        this.num4.value  =  Math.random();
    };
    
    componentDidUpdate(){
        notification.info({message: '消息提示', description: 'This is App componentDidUpdate'});
    }

    render() {

        return (
          <div>
              <Button onClick={this.handleClick}>改变Num</Button>
              <Test num1={this.num1}
                    num2={this.num2}
                    num3={this.num3}
                    num4={this.num4}
              />
          </div>
        );
    }
}

\`\`\`

`;


let result = `

\`\`\`js
1. App / Test 都不加 @observer
- 只有num4的值变化了

2. 只有Test组件加了 @observer
- num3 和 num4 的值发生了变化
- Test组件触发了componentWillReact  /  componentDidUpdate
- 测试表明 num3导致了Test触发componentWillReact  /  componentDidUpdate

3. 只有App组件加了 @observer
- num1 / num2 / num3 /num4 的值都改变了
- App组件触发了 componentDidUpdate
- Test组件触发了 componentWillReceiveProps / componentDidUpdate 

4. App / Test都加了@observer
- num1 / num2 / num3 /num4 的值都改变了
- App组件触发了 componentDidUpdate
- Test组件触发了 componentWillReact componentWillReceiveProps / componentDidUpdate 


-------------------------------------------------------

App re-render  =>  Test componentWillReceiveProps
componentWillReact的生效依赖于 @observer

-------------------------------------------------------

贴士与技巧：
在所有渲染 @observable 的组件上使用 @observer
@observer 只会增强你正在装饰的组件，而不是内部使用了的组件。 
所以通常你的所有组件都应该是装饰了的。但别担心，这样不会降低效率，相反 observer 组件越多，渲染效率越高

-------------------------------------------------------


MobX 可以做许多事，但是它无法将原始类型值转变成 observable
所以说值不是 observable，而对象的属性才是
永远只传递拥有 observable 属性的对象

\`\`\`
`;




//@observer
class Test extends React.Component {

    componentWillReact() {
        notification.info({message: '消息提示', description: 'This is Test componentWillReact'});
    }
    componentWillReceiveProps(){
        notification.error({message: '消息提示', description: 'This is Test componentWillReceiveProps'});
    }
    componentDidUpdate(){
        notification.warn({message: '消息提示', description: 'This is Test componentDidUpdate'});
    }

    render() {

        return (
          <div className="info-block">
              <div> num1: {this.props.num1}</div>
              <Observer>
                  {() => <div> num2: {this.props.num2}</div>}
              </Observer>
              <div> num3: {this.props.num3.value}</div>
              <Observer>
                  {() => <div> num4: {this.props.num4.value}</div>}
              </Observer>
          </div>
        );
    }
}


@observer
class P7 extends React.Component {

    @observable showResult = false;

    @observable num1 = 1;
    @observable num2 = 1;


    @observable  num3 = {
        value: 1
    };
    @observable  num4 = {
        value: 1
    };

    handleClick = () => {
        this.num1 = Math.random();
        this.num2 = Math.random();

        this.num3.value  =  Math.random();
        this.num4  = {value:12323}
    };


    componentDidUpdate(){
        notification.info({message: '消息提示', description: 'This is App componentDidUpdate'});
    }


    render() {

        return (
          <div>
              <Switch defaultChecked={false}  onChange={() => this.showResult = !this.showResult}/>

              <h1 style={{textAlign: 'center'}}>Observer (mobx-react)</h1>
              <Markdown source={info} />
              <Button onClick={this.handleClick}>改变Num</Button>
              <Test num1={this.num1}
                    num2={this.num2}
                    num3={this.num3}
                    num4={this.num4}
              />
              <Markdown source={result}  show={this.showResult}/>
          </div>
        );
    }
}

export default P7;
