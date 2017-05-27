import React from 'react'
import {observable, action, computed, extendObservable} from 'mobx'
import {observer} from 'mobx-react'
import Markdown from '../markdown'
import './p4.scss'
import { Button, Spin, Switch} from 'antd';
import _ from 'lodash'

let info = `
参考资料：[extendObservable](https://github.com/mobxjs/mobx/issues/194)

\`\`\`js

import {observable, action, computed, extendObservable} from 'mobx'
import {observer} from 'mobx-react'

    @observable isSpinning = {
        S1: false
    };

    @action handleClick1 = () => {
        this.isSpinning.S1 = !this.isSpinning.S1;
    };

    @action handleClick2 = () => {
        if(Object.keys(this.isSpinning).includes('S2')){
            this.isSpinning.S2 = !this.isSpinning.S2;
        }else{
            this.isSpinning.S2 = true;
        }
    };

    @action handleClick3 = () => {
        if(Object.keys(this.isSpinning).includes('S3')){
            this.isSpinning.S3 = !this.isSpinning.S3;
        }else{
            extendObservable(this.isSpinning, {S3:true});
        }
    };
    
    render() {

        return (
          <div>
               <Button onClick={this.handleClick1}>测试S1</Button>
               <Button onClick={this.handleClick2}>测试S2</Button>
               <Button onClick={this.handleClick3}>测试S3</Button>
               <div className="example">
                  <span>S1</span>
                  <Spin spinning={!!this.isSpinning.S1}/>
              </div>
              <div className="example">
                  <span>S2</span>
                  <Spin spinning={!!this.isSpinning.S2}/>
              </div>
              <div className="example">
                  <span>S3</span>
                  <Spin spinning={!!this.isSpinning.S3}/>
              </div>
          </div>
        );
    }
\`\`\`

`;



let result = `

\`\`\`js
        let arr = [];
        _.forOwn(this.isSpinning, (value, key, obj) => {
            arr.push(
              <div className="example">
                  <span>{key}</span>
                  <Spin spinning={value}/>
              </div>
            );
        });

\`\`\`
`;


@observer
class P4 extends React.Component {

    @observable showResult = false;

    @observable isSpinning = {
        S1: false
    };

    @action handleClick1 = () => {
        this.isSpinning.S1 = !this.isSpinning.S1;
    };

    @action handleClick2 = () => {
        if(Object.keys(this.isSpinning).includes('S2')){
            this.isSpinning.S2 = !this.isSpinning.S2;
        }else{
            this.isSpinning.S2 = true;
        }
    };

    @action handleClick3 = () => {
        if(Object.keys(this.isSpinning).includes('S3')){
            this.isSpinning.S3 = !this.isSpinning.S3;
        }else{
            extendObservable(this.isSpinning, {S3:true});
        }
    };

    render() {

        return (
          <div>
              <Switch defaultChecked={false}  onChange={() => this.showResult = !this.showResult}/>
              <h1 style={{textAlign: 'center'}}>object</h1>
              <div id="p4">
              </div>
              <Markdown source={info} />
               <Button onClick={this.handleClick1}>测试S1</Button>
               <Button onClick={this.handleClick2}>测试S2</Button>
               <Button onClick={this.handleClick3}>测试S3</Button>
              <div className="example">
                  <span>S1</span>
                  <Spin spinning={!!this.isSpinning.S1}/>
              </div>
              <div className="example">
                  <span>S2</span>
                  <Spin spinning={!!this.isSpinning.S2}/>
              </div>
              <div className="example">
                  <span>S3</span>
                  <Spin spinning={!!this.isSpinning.S3}/>
              </div>

              <Markdown source={result}  show={this.showResult}/>
          </div>
        );
    }
}

export default P4;
