import React from 'react'
import {observable, action, computed, extendObservable, toJS, isObservable} from 'mobx'
import {observer, Observer} from 'mobx-react'
import Markdown from '../../markdown'
import { Table, Button} from 'antd';

let info = `

\`\`\`js
1. 定义store, 直接export这个store,然后在定义组件中实例化，通过props传递到子组件
 
  -----------------------------------------
  
 class store {
    ...
 }
 
 export default store;
 
 -----------------------------------------
 
 import store from './store'
 let store-Instance = new store();
 
 
 class App extends Component {
        // 使用store-Instance的属性和方法
        
        render(){
            return (
                <OtherComponet store={store-Instance} />
            );
        };
 }
 
 -----------------------------------------
 
 

2. store定义完之后直接export这个store的实例（单例模式）,然后所有组件共享这一个store实例
   那个组件需要就import这个实例
        
  -----------------------------------------
  
  class store {
     ...
  }
  
  export default new store();
  
  -----------------------------------------
  
  import store-Instance from './store'
  
  class App extends Component {
       //  使用store-Instance的属性和方法
  }
  
  
  -----------------------------------------
  
  import store-Instance from './store'
  
  class OtherComponent extends Component {
      //  使用store-Instance的属性和方法
  }
     
  -----------------------------------------

    
\`\`\`

`;


@observer
class Q3 extends React.Component {


    render() {

        return (
          <div>
              <h1>Q3: 关于store的传递 / 单例模式 </h1>
              <Markdown source={info} />
          </div>
        );
    }
}

export default Q3;
