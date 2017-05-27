import React from 'react'
import {observable, action, computed, extendObservable, toJS, isObservable} from 'mobx'
import {observer, Observer} from 'mobx-react'
import Markdown from '../../markdown'
import { Table, Button} from 'antd';

let info = `
参考资料：
- [关于在mobx中如何observe观察深层的数据变动](https://github.com/ckinmind/ReactCollect/issues/97)
\`\`\`js

@observer
 class Test extends Component {

data = [];   // data内存储的是嵌套很深的数据
@observable updateKey = '';  //定义一个用于触发更新的变量

/** 视图触发器，里面什么也不用做 */
@action renderTrigger = () => {
 };

@action changeData = () => {
     // 异步或者别的什么操作，改变了data

    this.updateKey = Math.random();  // 随机改变updateKey的值，只要和之前不一样就行
    // 因为这里改变了，所以触发了renderTrigger的依赖变动（即使里面什么也不做），
   // 从而触发了视图更新, 从而将改变都反应到视图中
};

   render(){

    this.renderTrigger(this.updateKey);  // 这里必须传入updateKey，效果类似autorun

    return (
      .......
    )
  } 
}


1. 任何需要改变data然后视图更新的地方，都可以通过改变updateaKey来触发视图更新
2. 极端情况是，只定义一个updateKey是observable，其他所有的变量都可以不用是observable，
   任何数据改变后需要触发更新，只要直接this.updateKey = Math.random();就行
3. 还有一个额外的好处是，可以让data的数据结构变得清晰，否则使用observable之后结构看起来就不太一样，
   加上可能还需要转换状态比如toJS，slice之类的，使用了我这种方式就可以直接使用原数据

\`\`\`

`;



class Q2 extends React.Component {


    render() {

        return (
          <div>
              <h1>Q2: 关于更新触发的一种方案</h1>
              <Markdown source={info} />
          </div>
        );
    }
}

export default Q2;
