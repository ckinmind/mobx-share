import React from 'react'
import {observable, action, computed, extendObservable, isObservable,isObservableMap} from 'mobx'
import {observer} from 'mobx-react'
import Markdown from '../markdown'
import './p4.scss'
import { Button, Spin, Switch} from 'antd';

let info = `

\`\`\`js
import {observable, action, computed, extendObservable, isObservable,isObservableMap} from 'mobx'

    @observable map1 = observable.map();
    @observable map2 = new Map();

    @observable map3 = observable.map([
      ['map3',[{value: true, key:'map3-0'}]]
    ]);
    @observable map4 = new Map([
        ['map4',[{value: true, key:'map4-0'}]]
    ]);


    @action handleClick1 = () => {
        let key = 'map1-' + this.map1.size;
        this.map1.set(key, true);

        console.log('------ this is map1------');
         console.log(this.map1.keys());
        console.log(isObservable(this.map1.get('map1-1')));
        console.log(isObservable(this.map1));
        console.log(isObservableMap(this.map1));
    };

    @action handleClick2 = () => {
        let status = !this.map1.get('map1-1');
        this.map1.set('map1-1',status);
    };

    @action handleClick3 = () => {
        let key = 'map2-' + this.map2.size ;
        this.map2.set(key, true);

        console.log('------ this is map2------');
         console.log(this.map2.keys());
        console.log(isObservable(this.map2.get('map2-1')));
        console.log(isObservable(this.map2));
        console.log(isObservableMap(this.map2));
    };

    @action handleClick4 = () => {
        let status = !this.map2.get('map2-1');
        this.map2.set('map2-1', status);
    };

    @action handleClick5 = () => {
        let arr = this.map3.get('map3');
        let key = 'map3-' + arr.length;
        arr.push({value: true, key:key});

        console.log('------ this is map3------');
         console.log(this.map3.keys());
        console.log(isObservable(this.map3.get('map3')));
        console.log(isObservable(this.map3.get('map3')[1]));
        console.log(isObservable(this.map3));
        console.log(isObservableMap(this.map3));
    };

    @action handleClick6 = () => {
        let arr = this.map3.get('map3');
        arr[1].value = ! arr[1].value;
    };


    @action handleClick7 = () => {
        let arr = this.map4.get('map4');
        let key = 'map4-' + arr.length;
        arr.push({value: true, key:key});

        console.log('------ this is map4------');
         console.log(this.map4.keys());
        console.log(isObservable(this.map4.get('map4')));
        console.log(isObservable(this.map4.get('map4')[1]));
        console.log(isObservable(this.map4));
        console.log(isObservableMap(this.map4));
    };

    @action handleClick8 = () => {
        let arr = this.map4.get('map4');
        arr[1].value = ! arr[1].value;
    };


    render() {

        let arr = [];
        this.map1.forEach((value,key,map) => {
            if(value){
                arr.push(
                  <div className="example" key={key}>
                      <span>map1: {key}</span>
                      <Spin/>
                  </div>
                );
            }
        });

        let arr2 = [];
        this.map2.forEach((value,key,map) => {
            if(value) {
                arr2.push(
                  <div className="example" key={key} style={{backgroundColor: 'black'}}>
                      <span style={{color: 'white'}}>map3: {key}</span>
                      <Spin/>
                  </div>
                );
            }
        });

        let arr3 = [];
        this.map3.get('map3').forEach(item => {
            if(item.value) {
                arr3.push(
                  <div className="example" key={item.key} style={{backgroundColor: 'green'}}>
                      <span>map3: {item.key}</span>
                      <Spin/>
                  </div>
                );
            }
        });

        let arr4 = [];
        this.map4.get('map4').forEach(item => {
            if(item.value) {
                arr4.push(
                  <div className="example" key={item.key} style={{backgroundColor: 'blue'}}>
                      <span>map4: {item.key}</span>
                      <Spin/>
                  </div>
                );
            }
        });


       return (
          <div>
             
              <div style={{marginBottom: '200px'}}>
                  <Button onClick={this.handleClick1}>map1添加key</Button>
                  <Button onClick={this.handleClick2}>map1更改key的值</Button>
                  {arr}
              </div>

              <div style={{marginBottom: '200px'}}>
                  <Button onClick={this.handleClick3}>map2添加key</Button>
                  <Button onClick={this.handleClick4}>map2更改key的值</Button>
                  {arr2}
              </div>


              <div style={{marginBottom: '200px'}}>
                  <Button onClick={this.handleClick5}>map3添加key</Button>
                  <Button onClick={this.handleClick6}>map3更改key的值</Button>
                  {arr3}
              </div>

              <div style={{marginBottom: '200px'}}>
                  <Button onClick={this.handleClick7}>map4添加key</Button>
                  <Button onClick={this.handleClick8}>map4更改key的值</Button>
                  {arr4}
              </div>
          </div>

\`\`\`

`;



let result = `

\`\`\`js
class Store {  
  @observable map1 = observable.map([
  ['key1', 'value1'],
  ['key2',  'value2'],
]);
  @observable map2 = new Map([
  ['key1', 'value1'],
  ['key2',  'value2'],
]);
  map3 = new Map([
  ['key1', 'value1'],
  ['key2',  'value2'],
]);
}

const store = new Store();

console.log(Array.isArray(store.map1.values())) // true
console.log(Array.isArray(store.map2.values())) // true
console.log(Array.isArray(store.map3.values())) // false

console.log(store.map1.keys();  // ['key1', 'key2']
console.log(store.map2.keys()); // ['key1', 'key2']
console.log(store.map3.keys()); // MapIterator {"key1", "key2"}

values()方法类似keys()方法

测试结果表明，使用mobx的方式定义的map类型，通过values/keys方法返回的是一个数组，
而原生定义的map类型返回的是遍历器
\`\`\`
`;


@observer
class P6 extends React.Component {

    @observable showResult = false;


    @observable map1 = observable.map();
    @observable map2 = new Map();

    @observable map3 = observable.map([
      ['map3',[{value: true, key:'map3-0'}]]
    ]);
    @observable map4 = new Map([
        ['map4',[{value: true, key:'map4-0'}]]
    ]);


     map5 = new Map([
        ['key1', 'value1'],
        ['key2',  'value2'],
    ]);


    @action handleClick1 = () => {
        let key = 'map1-' + this.map1.size;
        this.map1.set(key, true);

        console.log('------ this is map1------');
        console.log(this.map1.keys());
        console.log(isObservable(this.map1.get('map1-1')));
        console.log(isObservable(this.map1));
        console.log(isObservableMap(this.map1));

        console.log(this.map5);
    };

    @action handleClick2 = () => {
        let status = !this.map1.get('map1-1');
        this.map1.set('map1-1',status);
    };






    @action handleClick3 = () => {
        let key = 'map2-' + this.map2.size ;
        this.map2.set(key, true);

        console.log('------ this is map2------');
        console.log(this.map2.keys());
        console.log(isObservable(this.map2.get('map2-1')));
        console.log(isObservable(this.map2));
        console.log(isObservableMap(this.map2));
    };

    @action handleClick4 = () => {
        let status = !this.map2.get('map2-1');
        this.map2.set('map2-1', status);
    };






    @action handleClick5 = () => {
        let arr = this.map3.get('map3');
        let key = 'map3-' + arr.length;
        arr.push({value: true, key:key});

        console.log('------ this is map3------');
        console.log(this.map3.keys());
        console.log(isObservable(this.map3.get('map3')));
        console.log(isObservable(this.map3.get('map3')[1]));
        console.log(isObservable(this.map3));
        console.log(isObservableMap(this.map3));
    };

    @action handleClick6 = () => {
        let arr = this.map3.get('map3');
        arr[1].value = ! arr[1].value;
    };




    @action handleClick7 = () => {
        let arr = this.map4.get('map4');
        let key = 'map4-' + arr.length;
        arr.push({value: true, key:key});

        console.log('------ this is map4------');
        console.log(this.map4.keys());
        console.log(isObservable(this.map4.get('map4')));
        console.log(isObservable(this.map4.get('map4')[1]));
        console.log(isObservable(this.map4));
        console.log(isObservableMap(this.map4));
    };

    @action handleClick8 = () => {
        let arr = this.map4.get('map4');
        arr[1].value = ! arr[1].value;
    };


    render() {

        let arr = [];
        this.map1.forEach((value,key,map) => {
            if(value){
                arr.push(
                  <div className="example" key={key}>
                      <span>map1: {key}</span>
                      <Spin/>
                  </div>
                );
            }
        });

        let arr2 = [];
        this.map2.forEach((value,key,map) => {
            if(value) {
                arr2.push(
                  <div className="example" key={key} style={{backgroundColor: 'black'}}>
                      <span style={{color: 'white'}}>map3: {key}</span>
                      <Spin/>
                  </div>
                );
            }
        });

        let arr3 = [];
        this.map3.get('map3').forEach(item => {
            if(item.value) {
                arr3.push(
                  <div className="example" key={item.key} style={{backgroundColor: 'green'}}>
                      <span>map3: {item.key}</span>
                      <Spin/>
                  </div>
                );
            }
        });

        let arr4 = [];
        this.map4.get('map4').forEach(item => {
            if(item.value) {
                arr4.push(
                  <div className="example" key={item.key} style={{backgroundColor: 'blue'}}>
                      <span>map4: {item.key}</span>
                      <Spin/>
                  </div>
                );
            }
        });



        return (
          <div>
              <Switch defaultChecked={false}  onChange={() => this.showResult = !this.showResult}/>
              <h1 style={{textAlign: 'center'}}>maps</h1>

              <div style={{marginBottom: '200px'}}>
                  <Button onClick={this.handleClick1}>map1添加key</Button>
                  <Button onClick={this.handleClick2}>map1更改key的值</Button>
                  {arr}
              </div>

              <div style={{marginBottom: '200px'}}>
                  <Button onClick={this.handleClick3}>map2添加key</Button>
                  <Button onClick={this.handleClick4}>map2更改key的值</Button>
                  {arr2}
              </div>


              <div style={{marginBottom: '200px'}}>
                  <Button onClick={this.handleClick5}>map3添加key</Button>
                  <Button onClick={this.handleClick6}>map3更改key的值</Button>
                  {arr3}
              </div>

              <div style={{marginBottom: '200px'}}>
                  <Button onClick={this.handleClick7}>map4添加key</Button>
                  <Button onClick={this.handleClick8}>map4更改key的值</Button>
                  {arr4}
              </div>

              <Markdown source={info} />
              <Markdown source={result}  show={this.showResult}/>
          </div>
        );
    }
}

export default P6;
