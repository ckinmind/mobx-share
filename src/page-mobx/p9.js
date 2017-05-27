import React from 'react'
import {observable, action, intercept, observe} from 'mobx'
import {observer, componentWillReact} from 'mobx-react'
import Markdown from '../markdown'
import { Table, Input, notification,Switch} from 'antd';

let info = `
参考资料：[Intercept & Observe](http://cn.mobx.js.org/refguide/observe.html)

\`\`\`js
import {observable, action, intercept, observe} from 'mobx'

@observable style = {
    color:''
};

@action handleEnter = (e) => {
    this.style.color = e.target.value
};
    
componentDidMount(){
        this.disposer = intercept(this.style, 'color', change => {

            if (!change.newValue) {
                // 忽略取消设置背景颜色
                notification.error({message: '错误提示', description: '颜色值不能为空'});
                return null;
            }
            if (change.newValue.length === 6) {
                // 补全缺少的 '#' 前缀
                change.newValue = '#' + change.newValue;
                notification.warn({message: '警告提示', description: '缺少#前缀'});
                return change;
            }
            if (change.newValue.length === 7) {
                return change;
            }
            if (change.newValue.length > 10) this.disposer(); // 不再拦截今后的任何变化
            notification.error({message: '错误提示', description: change.newValue + ' 不是一个合法的颜色值'});
        });

        this.disposer2 = observe(this.style, 'color', (change) => {
            notification.success({message: '颜色设置成功', description:
                \`更新类型：\${change.type}，
                输入的值：\${change.newValue}，
                旧的值：\${change.oldValue}
              \`});
        });

    }
    
    
    
    
\`\`\`

`;

let result = `

\`\`\`js
1. intercept 可以在变化作用于 observable 之前监测和修改变化。 

2. observe 允许你在 observable 变化之后拦截改变

3. intercept/observe 返回一个 disposer 函数，当调用时可以取消拦截器

4. autorun 通常是一个更强大的和更具声明性的 observe 替代品

5. 当 observe 被创建出来后就会对变化作出反应，而像 autorun 或 reaction 这样的反应，
   当它们变得可用时，它们会对新值做出反应。在大多数情况下，后者就足够了
   
6. intercept 和 observe 的回调函数接收一个事件对象   

   
\`\`\`

`;





@observer
class P9 extends React.Component {

    @observable showResult = false;

    @observable style = {
        color:''
    };

    @action handleEnter = (e) => {
        this.style.color = e.target.value
    };

    componentDidMount(){
        this.disposer = intercept(this.style, 'color', change => {

            if (!change.newValue) {
                // 忽略取消设置背景颜色
                notification.error({message: '错误提示', description: '颜色值不能为空'});
                return null;
            }
            if (change.newValue.length === 6) {
                // 补全缺少的 '#' 前缀
                change.newValue = '#' + change.newValue;
                notification.warn({message: '警告提示', description: '缺少#前缀'});
                return change;
            }
            if (change.newValue.length === 7) {
                return change;
            }
            if (change.newValue.length > 10) this.disposer(); // 不再拦截今后的任何变化
            notification.error({message: '错误提示', description: change.newValue + ' 不是一个合法的颜色值'});
        });

        this.disposer2 = observe(this.style, 'color', (change) => {
            notification.success({message: '颜色设置成功', description:
                `更新类型：${change.type}， 
                 输入的值：${change.newValue}，
                 旧的值：${change.oldValue}
            `});
        });

    }



    render() {

        return (
          <div>
              <Switch defaultChecked={false}  onChange={() => this.showResult = !this.showResult}/>
              <h1 style={{textAlign: 'center'}}>intercept & observe(注意和 observer/ Observer的区别)</h1>
              <Markdown source={info} />
              <div style={{width: '400px',height:'400px'}}>
                  <Input placeholder="请输入颜色值" onPressEnter={this.handleEnter}/>
                  <div style={{marginTop:'30px',height:'400px',width:'400px',backgroundColor: this.style.color}}></div>
              </div>

              <Markdown source={result}  show={this.showResult}/>
          </div>
        );
    }
}

export default P9;
