import React from 'react'
import {observable, action, computed, extendObservable, toJS, isObservable} from 'mobx'
import {observer, Observer, componentWillReact, inject, Provider} from 'mobx-react'
import Markdown from '../markdown'
import { Table, Badge, Button, notification, Switch} from 'antd';
import './css/p8.scss'

let info = `
\`\`\`js
import {observable, action } from 'mobx'
import {observer, inject, Provider} from 'mobx-react'


@inject('color','count') 
class BadgeContainer extends React.Component {
    render() {
        return (
          <Badge count={this.props.count} style={{ backgroundColor: this.props.color }}/>
        );
    }
}

class Message extends React.Component {
    render() {
        return (
          <div>
              <span> {this.props.text}</span>
              <BadgeContainer />
          </div>
        );
    }
}

@observer
class App extends React.Component {

    messages = [
        {text: '这是第一条消息'},
        {text: '这是第二条消息'},
        {text: '这是第三条消息'},
        {text: '这是第四条消息'}
    ];

    @observable color = '#87d068';
    @observable count = 19;

    handleClick = () => {
        this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
        this.count = Math.floor(Math.random()*100);
    };


    render() {
        const children = this.messages.map((message,index) =>
          <Message text={message.text} key={index}/>
        );
        return (
          <div>
              <Button onClick={this.handleClick}>改变</Button>
              <Provider color={this.color} count={this.count} suppressChangedStoreWarning={true}>
                  <div>
                      {children}
                  </div>
              </Provider>
          </div>
        )
    }
}
\`\`\`

`;

let result = `

\`\`\`js
1. Provider is a component that can pass stores (or other stuff) using React's context mechanism to child components

2. inject can be used to pick up those stores

3. if your stores will change over time, like an observable value of another store,
   MobX will warn you. To suppress that warning explicitly, 
   you can use suppressChangedStoreWarning={true} as a prop at your own risk.
\`\`\`
`;



@inject('color','count')  //@observer
class BadgeContainer extends React.Component {

    componentWillReact() {
        notification.info({message: '消息提示', description: 'This is componentWillReact'});
    }

    render() {
        return (
          <Badge count={this.props.count}  style={{ backgroundColor: this.props.color }}/>
        );
    }
}

//@observer
class Message extends React.Component {
    render() {
        return (
          <div className="message-item">
              <span> {this.props.text}</span>
              <BadgeContainer />
          </div>
        );
    }
}


@observer
class P8 extends React.Component {

    @observable showResult = false;

    messages = [
        {text: '这是第一条消息'},
        {text: '这是第二条消息'},
        {text: '这是第三条消息'},
        {text: '这是第四条消息'}
    ];

    @observable color = '#87d068';
    @observable count = 19;

    handleClick = () => {
        this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
        this.count = Math.floor(Math.random()*100);
    };


    render() {
        const children = this.messages.map((message,index) =>
          <Message text={message.text} key={index}/>
        );
        return (
          <div>
              <Switch defaultChecked={false}  onChange={() => this.showResult = !this.showResult}/>
              <h1 style={{textAlign: 'center'}}>Provider and inject</h1>
              <Markdown source={info} />
              <Button onClick={this.handleClick}>改变</Button>
              <Provider color={this.color} count={this.count} suppressChangedStoreWarning={true}>
                  <div>
                      {children}
                  </div>
              </Provider>


              <Markdown source={result}  show={this.showResult}/>
          </div>
        )
    }
}


export default P8;
